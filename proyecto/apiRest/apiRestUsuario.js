const bodyParser = require("body-parser");
const express = require("express");
const { get, request } = require("http");
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());

app.use(bodyParser.json({limit: "50mb"}));

let mysql = require ("mysql")
let cors = require('cors')
app.use(cors())
let connection = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: null,
        database: "united_vets" 

    }

  )

  connection.connect(function(error){
    if(error){  console.log(error)  }
    else{ console.log("conexion correcta");  }
  })

  let params; 
  let sql; 

function ejecutar(sql, params, res){
    connection.query(sql,params, function(err,response){
        if(err){
            console.log("Error"+err);
            res.send(err);
        }
        else{
          console.log("Resultado correcto"); 
          
            if(sql.includes('SELECT')){
                 if(response.length >0){
                    res.send(response);  
                 }
                 else{
                    res.send({ error: true, codigo: 200, mensaje: 'No tiene resultado ' });
                 }
            }
            else{
                res.send(response);  
            }
           
            console.log()
          

        }
    });
}


//----------------------------------------- Usuario L -----------------------------------------------
//GET   "http://localhost:3000/usuario?nombre=Tania"  ó "http://localhost:3000/usuario"
app.get('/usuario',
(req, res) => {
    let nombre = req.query.nombre;
    if (nombre) {
        params= nombre;
        sql="SELECT * FROM `usuario`where nombre_usuario=?";    
        ejecutar(sql,params,res);
        console.log("con id")
    }
    else {
        //todos los usuarios
        sql="SELECT * FROM `usuario`";
        ejecutar(sql,params,res);
        console.log("sin id")
    }
});

//para loguearse
app.post('/usuario/datos', function (req, res) {
    let nombre =req.body.nombre;
    let passw=req.body.passw;
    params= new Array(nombre,passw);
        //todos los usuarios
        sql="SELECT * FROM `usuario` where nombre_usuario=? AND password=?";
        ejecutar(sql,params,res);
        console.log("sin id"+nombre+passw)

    console.log('Nuevo entrada');
});

app.post('/usuario/dni', function (req, res) {
    let dni =req.body.dni;

    params= dni;
        //todos los usuarios
        sql="SELECT * FROM `usuario` where dni=?";
        ejecutar(sql,params,res);
        console.log("DNI "+dni)

});



app.post('/usuario/mascota', function (req, res) {
    let id =req.body.id;

    params= id;
        //todos los usuarios
        sql="SELECT u.* FROM mascota as m JOIN usuario as u ON(m.usuario_id=u.id) where m.id=?";
        ejecutar(sql,params,res);
        console.log("Id de mascota "+id);

});

//INSERT INTO `usuario` (`id`, `nombre`, `apellido1`, `apellido2`, `password`, `rol`, `fechaNacimiento`, `dni`, `foto`, `email`, `telefono`, `direccion`, `nColegiado`, `especialidad`, `nombre_usuario`) VALUES (NULL, 'Maria', 'Mendoza', 'Morales', '123', 'Cliente', '1991-04-12', '12312123', NULL, 'maria@gmail.com', '66662222', 'C/ Topacio 50,28360, Galapagar, Madrid', '', '', 'Maria')
app.post('/usuario', function (req, res) {
    let data = req.body;
    params = new Array( data.nombre, data.apellido1, data.apellido2, data.password, data.rol, data.fechaNacimiento, data.dni, data.email, data.telefono, data.direccion, data.nColegiado, data.especialidad, data.nombre_usuario, "../../../assets/imagenes/Usuario-Vacio.png");
    sql= "INSERT INTO `usuario` ( `nombre`, `apellido1`, `apellido2`, `password`, `rol`, `fechaNacimiento`, `dni`, `email`, `telefono`, `direccion`, `nColegiado`, `especialidad`, `nombre_usuario`, `foto`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

    ejecutar(sql,params,res);

    console.log('Nuevo Usuario');
});  


app.put('/usuario', function(req,res) {
    let data = req.body;

    params=new Array(data.nombre, data.apellido1, data.apellido2, data.fechaNacimiento, data.email, data.telefono, data.direccion, data.dni, data.id);
   sql= "UPDATE usuario SET nombre=?, apellido1=?, apellido2=?, fechaNacimiento=?, email=?, telefono=?, direccion=?, dni=? WHERE id=?";
    
   ejecutar(sql,params,res);

});

app.delete('/usuario', function (req, res) {
    let data = req.query.id;
     
    sql ="DELETE FROM usuario WHERE id="+data;
    ejecutar(sql,params,res);

});

//----------------------- Fin Usuario -----------------------------------




//-------------------------------Endpoint Dani -----------------------------------

//------------------------------ GET MASCOTA--------------------------------
app.get('/mascota',
(req, res) => {
    let usuario_id = req.query.usuario_id;
        params = usuario_id;
        sql="SELECT * FROM `mascota` WHERE usuario_id = ?";    
        ejecutar(sql,params,res);
        console.log("con id")
 
});

app.post('/mascota/id',
(req, res) => {
    let data = req.body
        params = new Array(data.mascota_nombre, data.usuario_nombre)
        sql="SELECT mascota.id AS id_mascota, usuario.id AS id_usuario FROM `mascota` JOIN usuario ON (mascota.usuario_id = usuario.id) WHERE mascota.nombre = ? AND usuario.nombre = ?";    
        ejecutar(sql,params,res);
        console.log(params)
 
});

//---------------------------GET CLIENTES Dani-----------------------------------------

app.get('/cliente',
(req, res) => {
    let nombre = req.query.nombre;
    
        params= nombre;
        sql="SELECT * FROM `usuario`where usuario.rol='Cliente'";    
        ejecutar(sql,params,res);
        console.log("con id")
    
 
});


//-------------------------------PUT Cliente----------------------------------

app.put('/cliente', function(req,res) {
    let data = req.body;

    params=new Array(data.password, data.email, data.telefono, data.direccion, data.especialidad, data.nColegiado, data.id);
   sql= "UPDATE usuario SET password=?, email=?, telefono=?, direccion=?, especialidad=?, nColegiado=? WHERE id=?";
    
   ejecutar(sql,params,res);

});


//------------------------------------GET USUARIO Dani-------------------------------

app.get('/usuario/perfil',
(req, res) => {
    let nombre = req.query.id;
    
        params = nombre;
        sql="SELECT * FROM `usuario`where id=?";    
        ejecutar(sql,params,res);
        console.log("con id")
    
 
});

//-------------------------------- POST MASCOTA-------------------------------

app.post('/mascota', function (req, res) {
    let data = req.body;
    params = new Array(data.nombre, data.chip, data.especie, data.raza, data.usuario_id, data.fechaNacimiento, data.alergias,"../../../assets/imagenes/gatoperfil.webp");
    sql= "INSERT INTO `mascota` (`nombre`, `chip`, `especie`, `raza`, `usuario_id`, `fechaNacimiento`, `alergias`, `foto`) VALUES ( ?, ?, ?, ?, ?, ?, ?,?)";

    console.log(data);
    console.log("holi");
    ejecutar(sql,params,res);


    console.log('Mascota añadida');
});  

//----------------------------------- PUT MASCOTA ---------------------------------------------------

app.put('/mascota', function(req,res) {
    let data = req.body;
    params = new Array( data.alergia,data.id);
   sql= "UPDATE `mascota` SET  `alergias`=? WHERE `id`=?";
    console.log(params)
    
   ejecutar(sql,params,res);

});

//-------------------------Final de endpoint Mascota-----------------------------------


//------------------ Historial --------------------------
//UPDATE `historial` SET `hist_id` = 'Hist01' WHERE `historial`.`id` = 1;
//SELECT h.*, m.nombreM, u.nombre as nombreP FROM historial as h JOIN mascota as m ON(h.mascota_id=m.id) JOIN usuario as u ON(m.usuario_id=u.id)

//GET   http://localhost:3000/historial
app.get('/historial',
(req, res) => {
        sql="SELECT h.*, m.nombre, u.nombre as nombreP, m.usuario_id as usuario_id  FROM historial as h JOIN mascota as m ON(h.mascota_id=m.id) JOIN usuario as u ON(m.usuario_id=u.id)";    
        ejecutar(sql,params,res);
        console.log("Lista de historial");
 
});



//put http://localhost:3000/historial
app.put('/historial', function(req,res) {
    let data = req.body;
    params = new Array( data.tratamiento, data.anamnesis,data.id);
   sql= "UPDATE historial SET tratamiento=?, anamnesis=? WHERE id = ?";
    console.log("Modificar Historial")
   ejecutar(sql,params,res);

});

app.post('/historial/usuarioId', function (req, res) {
    let id =req.body.id;

    params=id;
        //todos los usuarios
        sql="SELECT h.*, m.nombre, u.nombre as nombreP, m.usuario_id as usuario_id  FROM historial as h JOIN mascota as m ON(h.mascota_id=m.id) JOIN usuario as u ON(m.usuario_id=u.id) where u.id=?";
        ejecutar(sql,params,res);
        console.log("historial  id "+ id)

});

//SELECT h.*, m.nombre, u.nombre as nombreP FROM historial as h JOIN mascota as m ON(h.mascota_id=m.id) JOIN usuario as u ON(m.usuario_id=u.id) where m.id=4 and h.fecha=(SELECT MAX(h.fecha) FROM historial as h JOIN mascota as m ON(h.mascota_id=m.id) JOIN usuario as u ON(m.usuario_id=u.id) where m.id=4)
app.post('/historial/ultimoId', function (req, res) {
    let id =req.body.id;

    params=id
        //todos los usuarios
        sql="SELECT h.*, m.nombre, u.nombre as nombreP, m.usuario_id as usuario_id  FROM historial as h JOIN mascota as m ON(h.mascota_id=m.id) JOIN usuario as u ON(m.usuario_id=u.id) where m.id=? and h.fecha=(SELECT MAX(h.fecha) FROM historial as h JOIN mascota as m1 ON(h.mascota_id=m1.id) JOIN usuario as u ON(m1.usuario_id=u.id) where m1.id=m.id)"
        ejecutar(sql,params,res);
        console.log("historial ultimo id "+ id)

});

//-----------------------------------POST HISTORIAL DANI -----------------------------------------

app.post('/historial', function (req, res) {
    let data = req.body;
    params = new Array(data.mascota_id, data.anamnesis, data.tratamiento, data.fecha, data.hist_id);
    sql= "INSERT INTO `historial` ( `mascota_id`, `anamnesis`, `tratamiento`, `fecha`, `hist_id`) VALUES (?, ?, ?, ?, ?)";

    console.log(data);
    console.log("holi");
    ejecutar(sql,params,res);


    console.log('Historial añadido');
});  

//------------------------Historial con el id más alto---------------------------------
app.get('/historial/max',
(req, res) => {
        sql="SELECT MAX(id) as max from historial";    
        ejecutar(sql,params,res);
        console.log("Lista de historial");
 
});
//------------------- Fin Historial -------------------






//-------------------------Lista de citas por medico--------------------//
 
//GET   "http://localhost:3000/citas?idMedico=2"
app.get('/citas',
    (req, res) => {
        let idMed = req.query.idMedico;
        if (idMed) {
            console.log("id medico es" + idMed);
            params = idMed;
            sql = "SELECT c.*,m.nombre, u.nombre as nombreP, m.especie FROM citas as c JOIN mascota as m ON(c.mascota_id=m.id) JOIN usuario as u ON(m.usuario_id=u.id) JOIN usuario as u1 ON (c.vet_id=u1.id) WHERE u1.id=?";
            ejecutar(sql, params, res);
 
            console.log("con id")
        } else {
            //todos los usuarios
            sql = "SELECT * FROM `citas`"; //todas las citas 
            ejecutar(sql, params, res);
            console.log("sin id")
        }
    });

  //POST   "http://localhost:3000/citas/hoy    //fecha='2020-09-26'" 
    app.post('/citas/listaHoy', function (req, res) {
        let id =req.body.id;
        let fecha=req.body.fecha;
        params= new Array(id,fecha);
         
            sql="SELECT c.*,m.nombre, u.nombre as nombreP, m.especie FROM citas as c JOIN mascota as m ON(c.mascota_id=m.id) JOIN usuario as u ON(m.usuario_id=u.id) JOIN usuario as u1 ON (c.vet_id=u1.id) WHERE u1.id=? and c.fecha=?";
            ejecutar(sql,params,res);
            console.log("fecha y id "+fecha +" "+id)
    
    });

 //POST   "http://localhost:3000/citas/listaCliente    // u.id=4  fecha="2020-10-27" 

     app.post('/citas/listaCliente', function (req, res) {
        let id =req.body.id;
        let fecha=req.body.fecha;
        params= new Array(id,fecha);
            sql="SELECT c.*,m.nombre, u.nombre as nombreP, m.especie FROM citas as c JOIN mascota as m ON(c.mascota_id=m.id) JOIN usuario as u ON(m.usuario_id=u.id) where u.id=? and  DATE(c.fecha)>= DATE(?) ORDER BY fecha"
            ejecutar(sql,params,res);
            console.log("fecha hoy y id cliente "+fecha +" "+id)
    
    });

    app.get('/citas/max',
(req, res) => {
        sql="SELECT MAX(id) as max from citas";    
        ejecutar(sql,params,res);
        console.log("MAX de citas");
 
});

    
//---------------------------------PUT MODIFICAR CITAS-----------------------------------------
//UPDATE citas SET fecha="2020-10-21", hora="18:00" WHERE id=1   
 
app.put('/citas', function(req, res) {
    let data = req.body;
    params = new Array(data.fecha, data.hora, data.id)
    sql = "UPDATE citas SET fecha=?, hora=? WHERE id=?";
 
    ejecutar(sql, params, res);
 
});
 
//--------------------------------------POST INSERTAR CITA------------------------------//
//INSERT INTO `citas`(`id`, `mascota_id`, `fecha`, `hora`, `vet_id`, `cita_id`) VALUES (0,4,"2020/10/21","12:56",2,5)
//INSERT INTO `citas`(`id`, `mascota_id`, `fecha`, `hora`, `vet_id`, `cita_id`) VALUES (0,2,"2020/10/21","12:56",2,1)
//INSERT INTO `citas`( `mascota_id`, `fecha`, `hora`, `vet_id`, `cita_id`) VALUES (2,"2020/10/21","12:56",2,1)
app.post('/citas', function(req, res) {
    let data = req.body;

    params = new Array(data.mascota_id, data.fecha, data.hora, data.vet_id, data.cita_id);
    sql = "INSERT INTO citas( mascota_id, fecha, hora, vet_id, cita_id) VALUES (?,?,?,?,?)";
    ejecutar(sql, params, res);
    console.log('Nueva cita');
});
 
app.post('/mascotaId', function(req, res) {
    let dni = req.body.dni;
    let mascota = req.body.mascota;
    params = new Array(dni, mascota);
    // sql = "SELECT mascota.id FROM mascota JOIN usuario ON (mascota.usuario_id = usuario.id) WHERE usuario.nombre_usuario='" + usuario + "' and mascota.nombre='" + mascota + "'";
    sql = "SELECT mascota.id FROM mascota JOIN usuario ON (mascota.usuario_id = usuario.id) WHERE usuario.dni=? and mascota.nombre=?"
    console.log(sql)
    ejecutar(sql, params, res);
    console.log('Nueva cita');
});
    

//---------------------------------------DELETE Elimiar Cita---------------------------------------------
//DELETE FROM `citas` WHERE cita_id=1
//{​​​​​​​​ "id": 25}​​​​​​​​posman
app.delete('/citas', function(req, res) {
    let idCita = req.body.id;
    let params = [idCita];
    sql = "DELETE FROM citas WHERE id=?";
    ejecutar(sql, params, res);
 
});


 
app.put('/foto', function(req, res) {
    let data = req.body;
   // console.log(data);

    params = new Array(data.foto,data.id)
    sql = "UPDATE usuario SET foto=? where id=?";
 
    ejecutar(sql, params, res);
 
});

app.put('/fotoMascota', function(req, res) {
    let data = req.body;

    params = new Array(data.foto,data.id)
    sql = "UPDATE mascota SET foto=? where id=?";
 
    ejecutar(sql, params, res);
 
});




//---------- Metodo sin pagina y escuchar servidor   
/*si no pasan correctamente un 
url entraria en este metodo llamado use, usaria next
si queremos que aparesca en el middleware */
app.use(
    (req, res, next) => {
        let respuesta = { error: true, codigo: 404, mensaje: 'Url no encontrada' };
        res.status(404).send(respuesta);
        //next();
    }
);






app.listen(3000, function () {
    console.log('Server is running..');
});
