const { _x } = wp.i18n;
export default [
    { label: '- ' + _x('Select', 'admin-text', 'site-reviews') + ' -', value: '' },
    { label: _x('Assign to one or more Post IDs', 'admin-text', 'site-reviews'), value: 'custom' },
    { label: _x('Assign to the Current Page', 'admin-text', 'site-reviews'), value: 'post_id' },
    { label: _x('Assign to the Parent Page', 'admin-text', 'site-reviews'), value: 'parent_id' },
];
