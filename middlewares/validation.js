module.exports=(req,res,next)=>{

    const {name,email,password}=req.body;

    function validEmail(email)
    {
        // return /^([a-zA-Z0-9]+)@([a-zA-Z0-9])+.([a-z])+$/gm.test(email);
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    if(req.path==="/register")
    {
        if(![name,email,password].every(Boolean))
        {
           return  res.json("Missing credential")
        }
        else if(!validEmail(email))
        {
           return res.json("Invalid email")
        }

    }
 next();  
}