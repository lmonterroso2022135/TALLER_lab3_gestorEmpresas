
export const isAdminRole = (req, res, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: "Login is required to perform this action."
        });
    }

    const {role, nombre} =  req.user;

    if(role !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${nombre} is not an ADMIN`
        });
    };
    next();
}