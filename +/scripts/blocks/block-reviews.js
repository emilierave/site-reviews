import { CheckboxControlList } from './checkbox-control-list';
import { ReviewsIcon } from './icons';
import AssignedPostsOptions from './assigned_posts';
import AssignedTermsOptions from './assigned_terms';
import AssignedUsersOptions from './assigned_users';
import ConditionalSelectControl from './ConditionalSelectControl';
import onRender from './on-render';
import terms_options from './terms-options';
import transformWidgetAttributes from './transform-widget';
import type_options from './type-options';
import ServerSideRender from './server-side-render';

const { _x } = wp.i18n;
const { createBlock, registerBlockType } = wp.blocks;
const { InspectorAdvancedControls, InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl } = wp.components;

const blockName = GLSR_Block.nameprefix + '/reviews';

const attributes = {
    assigned_to: { default: '', type: 'string' },
    assigned_posts: { default: '', type: 'string' },
    assigned_terms: { default: '', type: 'string' },
    assigned_users: { default: '', type: 'string' },
    category: { default: '', type: 'string' },
    className: { default: '', type: 'string' },
    display: { default: 5, type: 'number' },
    hide: { default: '', type: 'string' },
    id: { default: '', type: 'string' },
    pagination: { default: '', type: 'string' },
    post_id: { default: '', type: 'string' },
    rating: { default: 0, type: 'number' },
    schema: { default: false, type: 'boolean' },
    terms: { default: '', type: 'string' },
    type: { default: 'local', type: 'string' },
    user: { default: '', type: 'string' },
};

const edit = props => {
    props.attributes.post_id = jQuery('#post_ID').val();
    const { attributes: { assigned_to, assigned_posts, assigned_terms, assigned_users, category, display, hide, id, pagination, rating, schema, terms, type, user }, className, setAttributes } = props;
    const inspectorControls = {
        assigned_to: <ConditionalSelectControl
            key={ 'assigned_posts' }
            label={ _x('Limit Reviews to an Assigned Page', 'admin-text', 'site-reviews') }
            onChange={ assigned_to => setAttributes({
                assigned_to: assigned_to,
                assigned_posts: ('custom' === assigned_to ? assigned_posts : ''),
            })}
            options={ AssignedPostsOptions }
            value={ assigned_to }
        >
            <TextControl
                className="glsr-base-conditional-control"
                help={ _x('Separate values with a comma.', 'admin-text', 'site-reviews') }
                onChange={ assigned_posts => setAttributes({ assigned_posts }) }
                placeholder={ _x('Enter the Post IDs', 'admin-text', 'site-reviews') }
                type="text"
                value={ assigned_posts }
            />
        </ConditionalSelectControl>,
        category: <ConditionalSelectControl
            key={ 'assigned_terms' }
            label={ _x('Limit Reviews to an Assigned Category', 'admin-text', 'site-reviews') }
            onChange={ category => setAttributes({
                category: category,
                assigned_terms: ('custom' === category ? assigned_terms : ''),
            })}
            options={ AssignedTermsOptions }
            value={ category }
        >
            <TextControl
                className="glsr-base-conditional-control"
                help={ _x('Separate values with a comma.', 'admin-text', 'site-reviews') }
                onChange={ assigned_terms => setAttributes({ assigned_terms }) }
                placeholder={ _x('Enter the Category IDs or slugs', 'admin-text', 'site-reviews') }
                type="text"
                value={ assigned_terms }
            />
        </ConditionalSelectControl>,
        user: <ConditionalSelectControl
            key={ 'assigned_users' }
            label={ _x('Limit Reviews to an Assigned User', 'admin-text', 'site-reviews') }
            onChange={ user => setAttributes({
                user: user,
                assigned_users: ('custom' === user ? assigned_users : ''),
            })}
            options={ AssignedUsersOptions }
            value={ user }
        >
            <TextControl
                className="glsr-base-conditional-control"
                help={ _x('Separate values with a comma.', 'admin-text', 'site-reviews') }
                onChange={ assigned_users => setAttributes({ assigned_users }) }
                placeholder={ _x('Enter the User IDs or usernames', 'admin-text', 'site-reviews') }
                type="text"
                value={ assigned_users }
            />
        </ConditionalSelectControl>,
        terms: <SelectControl
            key={ 'terms' }
            label={ _x('Limit Reviews to terms', 'admin-text', 'site-reviews') }
            onChange={ terms => setAttributes({ terms }) }
            options={ terms_options }
            value={ terms }
        />,
        pagination: <SelectControl
            key={ 'pagination' }
            label={ _x('Enable Pagination', 'admin-text', 'site-reviews') }
            onChange={ pagination => setAttributes({ pagination }) }
            options={[
                { label: '- ' + _x('Select', 'admin-text', 'site-reviews') + ' -', value: '' },
                { label: _x('Yes (AJAX load more)', 'admin-text', 'site-reviews'), value: 'loadmore' },
                { label: _x('Yes (AJAX pagination)', 'admin-text', 'site-reviews'), value: 'ajax' },
                { label: _x('Yes (page reload)', 'admin-text', 'site-reviews'), value: 'true' },
            ]}
            value={ pagination }
        />,
        type: <SelectControl
            key={ 'type' }
            label={ _x('Limit the Type of Reviews', 'admin-text', 'site-reviews') }
            onChange={ type => setAttributes({ type }) }
            options={ type_options }
            value={ type }
        />,
        display: <RangeControl
            key={ 'display' }
            label={ _x('Reviews Per Page', 'admin-text', 'site-reviews') }
            min={ 1 }
            max={ 50 }
            onChange={ display => setAttributes({ display }) }
            value={ display }
        />,
        rating: <RangeControl
            key={ 'rating' }
            label={ _x('Minimum Rating', 'admin-text', 'site-reviews') }
            min={ 0 }
            max={ GLSR_Block.maxrating }
            onChange={ rating => setAttributes({ rating }) }
            value={ rating }
        />,
        schema: <ToggleControl
            key={ 'schema' }
            checked={ schema }
            help={ _x('The schema should only be enabled once per page.', 'admin-text', 'site-reviews') }
            label={ _x('Enable the schema?', 'admin-text', 'site-reviews') }
            onChange={ schema => setAttributes({ schema }) }
        />,
        hide: CheckboxControlList(GLSR_Block.hideoptions.site_reviews, hide, setAttributes),
    };
    const inspectorPanels = {
        panel_settings: <PanelBody title={ _x('Settings', 'admin-text', 'site-reviews')}>
            { Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+'.reviews.InspectorControls', inspectorControls, props)) }
        </PanelBody>
    };
    const inspectorAdvancedControls = {
        id: <TextControl
            label={ _x('Custom ID', 'admin-text', 'site-reviews') }
            onChange={ id => setAttributes({ id }) }
            value={ id }
        />,
    };
    return [
        <InspectorControls>
            { Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+'.reviews.InspectorPanels', inspectorPanels, props)) }
        </InspectorControls>,
        <InspectorAdvancedControls>
            { Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+'.reviews.InspectorAdvancedControls', inspectorAdvancedControls, props)) }
        </InspectorAdvancedControls>,
        <ServerSideRender block={ blockName } attributes={ props.attributes } onRender={ onRender }>
        </ServerSideRender>
    ];
};

wp.hooks.addFilter('blocks.getBlockAttributes', blockName, (attributes, block, unknown, saved) => {
    if (saved && saved.count) { // @deprecated in 4.1.0
        attributes.display = saved.count;
    }
    return attributes;
});

export default registerBlockType(blockName, {
    attributes: attributes,
    category: GLSR_Block.nameprefix,
    description: _x('Display your most recent reviews.', 'admin-text', 'site-reviews'),
    edit: edit,
    example: {
        attributes: { 
            display: 2,
            pagination: 'ajax',
            rating: 0,
        },
    },
    icon: {src: ReviewsIcon},
    keywords: ['reviews'],
    save: () => null,
    title: _x('Latest Reviews', 'admin-text', 'site-reviews'),
    transforms: {
        from: [{
            type: 'block',
            blocks: ['core/legacy-widget'],
            isMatch: ({ idBase, instance }) => idBase === 'glsr_site-reviews' && !! instance?.raw,
            transform: ({ instance }) => createBlock(blockName, transformWidgetAttributes(instance, attributes)),
        }],
    },
});
