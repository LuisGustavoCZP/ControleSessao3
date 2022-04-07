const cypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = [];
const sessions = [];

function indexOf (user) 
{
    for (let i = 0; i < users.length; i++)
    {
        const suser = users[i];
        if(suser.name == user.name) 
        {
            bcrypt.compare(user.pass, suser.pass, function(err, res) {
                if(res == true) return i;
              });  
        }
    }
    return -1;
}

function create (user)
{
    const userid = users.length;
    bcrypt.hash(user.pass, saltRounds, (err, hash) => 
    {
        user.pass = hash;
    });
    users.push(user);
    return userid;
}

function getsession (token)
{
    const session = sessions[token];
    if(session)
    {
        console.log(session);
        const user = users[session.userid];
        if(user)
        {
            return user;
        }
        else 
        {
            return undefined;
        }
    }
    else 
    {
        return undefined;
    }
}

function login (req, res) 
{
    console.log(req.cookies);
    const token = req.cookies["token"];
    if(!token) 
    {
        let hasacc = true;
        console.log(req.body);
        const nuser = {name:req.body["usuario"], pass:req.body["password"]};
        let userID = indexOf(nuser);
        if(userID == -1) 
        {
            userID = create(nuser);
            hasacc = false;
        } //
        const newsession = 
        {
            key:cypto.randomUUID(),
            userid:userID
        };
        sessions[newsession.key] = newsession;
        res.cookie('token', `${newsession.key}`, { maxAge: 900000, httpOnly: true });
        const page = `<form action="" method="post"><input type="submit" value="Enviar"/></form>`;
        res.send(page);
    } 
    else
    {
        const user = getsession(token);
        if(user)
        {
            const page = `<h2>Bem vindo ${user.name}</h2>`;
            res.send(page);
        }
        else 
        {
            res.cookie('token', ``, { maxAge: 0, httpOnly: true });
            const page = `<h2>Não foi possível logar no servidor!</h2>`;
            res.send(page);
        }
    }
}

function main (req, res) 
{
    res.sendFile(`${__dirname.replace("modules", "src")}/login.html`);
}

module.exports = {main, login, users};
