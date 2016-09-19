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