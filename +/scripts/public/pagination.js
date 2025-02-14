/** global: GLSR */

const classNames = {
    hide: 'glsr-hide',
}

const config = {
    scrollOffset: 16,
    scrollTime: 468,
}

const selectors = {
    button: 'button.glsr-button-loadmore',
    link: '.glsr-pagination a.page-numbers',
    pagination: '.glsr-pagination',
    reviews: '.glsr-reviews, [data-reviews]',
}

class Pagination {
    constructor (wrapperEl, paginationEl) {
        this.events = {
            button: {
                click: this._onLoadMore.bind(this),
            },
            link: {
                click: this._onPaginate.bind(this),
            },
            window: {
                popstate: this._onPopstate.bind(this),
            },
        };
        this.paginationEl = paginationEl;
        this.reviewsEl = wrapperEl.querySelector(selectors.reviews);
        this.wrapperEl = wrapperEl;
    }

    destroy () {
        this._eventHandler('remove')
    }

    init () {
        this._eventHandler('add')
        const current = this.paginationEl.querySelector('.current');
        if (current) {
            const data = this._data(current);
            const nextLink = current.nextElementSibling;
            if (data && nextLink && 2 === +nextLink.dataset.page && GLSR.urlparameter) { // window loaded page 1
                window.history.replaceState(data, '', window.location);
            }
        }
    }

    _data (el) {
        try {
            const dataset = JSON.parse(JSON.stringify(this.paginationEl.dataset));
            const data = {};
            for (var key of Object.keys(dataset)) {
                let value;
                try {
                    value = JSON.parse(dataset[key]);
                } catch(e) {
                    value = dataset[key];
                }
                data[`${GLSR.nameprefix}[atts][${key}]`] = value;
            }
            data[`${GLSR.nameprefix}[_action]`] = 'fetch-paged-reviews';
            data[`${GLSR.nameprefix}[page]`] = el.dataset.page || 1;
            data[`${GLSR.nameprefix}[schema]`] = false;
            data[`${GLSR.nameprefix}[url]`] = el.href || location.href;
            return data;
        } catch(e) {
            console.error('Invalid pagination config.');
            return false;
        }
    }

    _eventHandler (action) {
        this._eventListener(window, action, this.events.window)
        this.wrapperEl.querySelectorAll(selectors.button).forEach(el => {
            this._eventListener(el, action, this.events.button)
        });
        this.wrapperEl.querySelectorAll(selectors.link).forEach(el => {
            this._eventListener(el, action, this.events.link)
        });
    }

    _eventListener (el, action, events) {
        Object.keys(events).forEach(event => el[action + 'EventListener'](event, events[event]))
    }

    _handleLoadMore (buttonEl, request, response, success) {
        if (!success) {
            window.location = location; // reload page
            return;
        }
        buttonEl.setAttribute('aria-busy', 'false')
        buttonEl.removeAttribute('disabled')
        this.destroy()
        this.paginationEl.innerHTML = response.pagination;
        this.reviewsEl.insertAdjacentHTML('beforeend', response.reviews)
        this.init()
        GLSR.Event.trigger('site-reviews/pagination/handle', response, this);
    }

    _handlePagination (linkEl, request, response, success) {
        if (!success) {
            window.location = linkEl.href; // reload page
            return;
        }
        this._paginate(response)
        if (GLSR.urlparameter) {
            window.history.pushState(request, '', linkEl.href); // add a new entry to browser History
        }
    }

    _handlePopstate (request, response, success) {
        if (success) {
            this._paginate(response)
        } else {
            console.error(response);
        }
    }

    _onLoadMore (ev) {
        const el = ev.currentTarget;
        const data = this._data(el);
        if (data) {
            el.setAttribute('aria-busy', 'true');
            el.setAttribute('disabled', '');
            ev.preventDefault();
            GLSR.ajax.post(data, this._handleLoadMore.bind(this, el, data));
        }
    }

    _onPaginate (ev) {
        const el = ev.currentTarget;
        const data = this._data(el);
        if (data) {
            this.wrapperEl.classList.add(classNames.hide);
            ev.preventDefault();
            GLSR.ajax.post(data, this._handlePagination.bind(this, el, data));
        }
    }

    _onPopstate (ev) {
        GLSR.Event.trigger('site-reviews/pagination/popstate', ev, this);
        if (ev.state && ev.state[`${GLSR.nameprefix}[_action]`]) {
            this.wrapperEl.classList.add(classNames.hide);
            GLSR.ajax.post(ev.state, this._handlePopstate.bind(this, ev.state));
        }
    }

    _paginate (response) {
        this.destroy();
        this.paginationEl.innerHTML = response.pagination;
        this.reviewsEl.innerHTML = response.reviews;
        this.init();
        this._scrollToTop();
        this.wrapperEl.classList.remove(classNames.hide);
        GLSR.Event.trigger('site-reviews/pagination/handle', response, this);
    }

    _scrollStep (context) {
        const elapsed = Math.min(1, (window.performance.now() - context.startTime) / config.scrollTime);
        const easedValue = 0.5 * (1 - Math.cos(Math.PI * elapsed));
        const currentY = context.startY + (context.endY - context.startY) * easedValue;
        window.scroll(0, context.offset + currentY); // set the starting scoll position
        if (currentY !== context.endY) {
            window.requestAnimationFrame(this._scrollStep.bind(this, context));
        }
    }

    _scrollToTop () {
        let offset = config.scrollOffset;
        [].forEach.call(GLSR.ajaxpagination, selector => {
            const fixedEl = document.querySelector(selector);
            if (fixedEl && 'fixed' === window.getComputedStyle(fixedEl).getPropertyValue('position')) {
                offset = offset + fixedEl.clientHeight;
            }
        })
        const clientBounds = this.reviewsEl.getBoundingClientRect();
        const offsetTop = clientBounds.top - offset;
        if (offsetTop > 0) return; // if top is in view, don't scroll
        this._scrollStep({
            endY: offsetTop,
            offset: window.pageYOffset,
            startTime: window.performance.now(),
            startY: this.reviewsEl.scrollTop,
        });
    }
}

export default Pagination;
