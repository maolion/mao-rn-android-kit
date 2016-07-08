/**
 * @author lion
 * @email maolion.j@gmail.com
 */

import { Component } from 'react';

export function foramt(template: string, data: any) {
    if (!data) {
        return template;
    }
    
    return template.replace(/\{([^\}]+)\}/g, function(mStr, cStr1) {
        return data.hasOwnProperty(cStr1) ? data[cStr1] : cStr1;
    });
}

export function reactMixins(mixins: any[]):ClassDecorator {
    return (DecoratedComponent: any) => {
        class ReactMixinsDecorator extends Component<any, any> {
            static propTypes = DecoratedComponent.propTypes;

            render() {
                return <DecoratedComponent {...this.props}/>
            }
        }

        mixins = mixins || [];
        const prototype: any = DecoratedComponent.prototype;
        const newPrototype: any = {};
        
        for (let source of mixins) {
            mixin(newPrototype, source);
        }
        
        Object.keys(newPrototype).forEach((methodName) => {
            const method = newPrototype[methodName];

            if (prototype[methodName] instanceof Function) {
                const originMethod = prototype[methodName];
                if (!(method instanceof MixinStack)) {
                    newPrototype[methodName] = new MixinStack();
                    newPrototype[methodName].list.push(method);
                }

               newPrototype[methodName].list.push(originMethod);
            }

            if (newPrototype[methodName] instanceof MixinStack) {
                const methods = newPrototype[methodName].list;
                prototype[methodName] = function() {
                    for (let method of methods) {
                        method.apply(this, arguments);
                    }
                };
            } else {
                prototype[methodName] = newPrototype[methodName];
            }
        });

        return ReactMixinsDecorator;
    };
}

class MixinStack {
    list: Function[];
    constructor() {
        this.list = [];
    }
}

function mixin(dest: any, source: any) {
    if (!source) {
        return;
    }

    if (source.mixins && source.mixins.length) {
        for (let next of source.mixins) {
            mixin(dest, next);
        }
    }

    Object.keys(source).forEach((methodName) => {
        const method = source[methodName];
        if (!(method instanceof Function)) {
            return;
        }
        
        if (dest[methodName]) {
            if (dest[methodName] instanceof Function) {
                const originMethod = dest[methodName];
                dest[methodName] = new MixinStack();
                dest[methodName].list.push(originMethod);
            }
            
            if (dest[methodName] instanceof MixinStack) {
                dest[methodName].list.push(method);
            }
        } else {
            dest[methodName] = method;
        }
    });
}