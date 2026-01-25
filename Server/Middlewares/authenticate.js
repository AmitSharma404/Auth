

export const authenticate = (req,res,next) => {
    req.requestAt = new Date().toISOString();
    console.log(req.requestAt);
    next();
}