

const handleRouteAsync = (fn)=> {
    return async (req, res, next) => {
        try {
            await fn(req, res)
        }
        catch(err) {
            err.status = 500
            next(err)
        }
    }
}

module.exports = {
    handleRouteAsync
}