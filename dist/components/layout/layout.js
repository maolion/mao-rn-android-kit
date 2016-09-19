import { UIManager, findNodeHandle } from 'react-native';
export default class Layout {
    static setChildrenLayoutParams(component, manager, defaultParams) {
        if (!component || !manager) {
            return;
        }
        let childrelLayoutParams = [];
        const hasDefaultParams = !!defaultParams;
        React.Children.map(component.props.children, (child, index) => {
            if (!child.props.layoutParams && !hasDefaultParams) {
                return;
            }
            childrelLayoutParams.push(Object.assign({}, defaultParams, child.props.layoutParams, { childIndex: index }));
        });
        if (!childrelLayoutParams.length) {
            return;
        }
        UIManager.dispatchViewManagerCommand(findNodeHandle(component), manager.Commands.setChildrenLayoutParams, [childrelLayoutParams]);
    }
}
