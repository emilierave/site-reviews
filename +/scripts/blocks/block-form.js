import { CheckboxControlList } from './checkbox-control-list';
import { FormIcon } from './icons';
import AssignedPostsOptions from './assigned_posts';
import AssignedTermsOptions from './assigned_terms';
import AssignedUsersOptions from './assigned_users';
import onRender from './on-render';
import transformWidgetAttributes from './transform-widget';
import ConditionalSelectControl from './ConditionalSelectControl';
import ServerSideRender from './server-side-render';

const { _x } = wp.i18n;
const { createBlock, registerBlockType } = wp.blocks;
const { InspectorAdvancedControls, InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, TextControl } = wp.components;

const blockName = GLSR_Block.nameprefix + '/form';

const attributes = {
    assign_to: { default: '', type: 'string' },
    assigned_posts: { default: '', type: 'string' },
    assigned_terms: { default: '', type: 'string' },
    assigned_users: { default: '', type: 'string' },
    category: { default: '', type: 'string' },
    className: { default: '', type: 'string' },
    hide: { default: '', type: 'string' },
    id: { default: '', type: 'string' },
    user: { default: '', type: 'string' },
};

const edit = props => {
    const { attributes: { assign_to, assigned_posts, assigned_terms, assigned_users, category, hide, id, user }, className, setAttributes } = props;
    const inspectorControls = {
        assign_to: <ConditionalSelectControl
            key={ 'assigned_posts' }
            label={ _x('Assign Reviews to a Page', 'admin-text', 'site-reviews') }
            onChange={ assign_to => setAttributes({
                assign_to: assign_to,
                assigned_posts: ('custom' === assign_to ? assigned_posts : ''),
            })}
            options={ AssignedPostsOptions }
            value={ assign_to }
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
            label={ _x('Assign Reviews to a Category', 'admin-text', 'site-reviews') }
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
            label={ _x('Assign Reviews to a User', 'admin-text', 'site-reviews') }
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
        hide: CheckboxControlList(GLSR_Block.hideoptions.site_reviews_form, hide, setAttributes),
    };
    const inspectorPanels = {
        panel_settings: <PanelBody title={ _x('Settings', 'admin-text', 'site-reviews')}>
            { Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+'.form.InspectorControls', inspectorControls, props)) }
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
            { Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+'.form.InspectorPanels', inspectorPanels, props)) }
        </InspectorControls>,
        <InspectorAdvancedControls>
            { Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+'.form.InspectorAdvancedControls', inspectorAdvancedControls, props)) }
        </InspectorAdvancedControls>,
        <ServerSideRender block={ blockName } attributes={ props.attributes } onRender={ onRender }>
        </ServerSideRender>
    ];
};

export default registerBlockType(blockName, {
    attributes: attributes,
    category: GLSR_Block.nameprefix,
    description: _x('Display a review form.', 'admin-text', 'site-reviews'),
    edit: edit,
    example: {},
    icon: {src: FormIcon},
    keywords: ['reviews', 'form'],
    save: () => null,
    title: _x('Submit a Review', 'admin-text', 'site-reviews'),
    transforms: {
        from: [{
            type: 'block',
            blocks: ['core/legacy-widget'],
            isMatch: ({ idBase, instance }) => idBase === 'glsr_site-reviews-form' && !! instance?.raw,
            transform: ({ instance }) => createBlock(blockName, transformWidgetAttributes(instance, attributes)),
        }],
    },
});
