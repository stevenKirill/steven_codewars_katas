Function.prototype.bind = function(ctx) {
    const boundArgs = [].slice.call(arguments, 1);
    const func = this;

    return function() {
        const callArgs = boundArgs.concat([].slice.call(arguments))
        return func.apply(ctx, callArgs)
    }
}

export default Function.prototype.bind