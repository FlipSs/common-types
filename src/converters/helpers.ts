import {IObjectConverterBuilder, ObjectConverterBuilder} from "./internal";
import {Argument, TypeUtils} from "../utils/internal";
import {Func} from "../types/internal";
import {asEnumerable, IReadOnlySet} from "../collections/internal";
import {IConstructorWithoutParameters} from "../common/internal";

export function buildObjectConverterUsingConstructor<TSource, TTarget>(referenceObjectConstructor: IConstructorWithoutParameters<TTarget>): IObjectConverterBuilder<TSource, TTarget> {
    Argument.isNotNullOrUndefined(referenceObjectConstructor, 'referenceObjectConstructor');

    return new ObjectConverterBuilder(() => new referenceObjectConstructor());
}

export function buildObjectConverter<TSource, TTarget>(referenceObjectFactory: Func<TTarget>): IObjectConverterBuilder<TSource, TTarget> {
    Argument.isNotNullOrUndefined(referenceObjectFactory, 'referenceObjectFactory');

    return new ObjectConverterBuilder(referenceObjectFactory);
}

export function getAvailablePropertyNames(value: any): IReadOnlySet<string> {
    return asEnumerable(Object.getOwnPropertyNames(value)).where(p => {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(value, p);

        return !TypeUtils.isNullOrUndefined(propertyDescriptor) && propertyDescriptor.writable;
    }).toReadOnlySet();
}