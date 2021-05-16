const { query } = require('express');
var express = require('express');
var exphbs = require('express-handlebars');
var mercadopago = require("mercadopago");
var { json } = require("body-parser");
require("dotenv").config();
var port = process.env.PORT || 3000
// Una vez que instlalamos e importamos la libreria, ahora es necesario definir las credenciales para que MP sepa quienes somos (algo asi como cuando usamos firebase)
mercadopago.configure({
    // el access_token es la token que nos generara MP por cada integracion que realice, esta token es unica por empresa y no debe ser usada en dos pasarelas diferentes ya que la configuracion sera diferente
    access_token: process.env.ACCESS_TOKEN,
    // integrador_id es la identificacion que nosostros tendremos una vez realizada la certificacion, esta nos ayudara para que MP sepa que desarrollador fue el responsable de dicha integracion
    integrator_id: process.env.INTEGRATOR_ID,
})
var app = express();
app.use(json());
const cliente = {
    name: "Lalo",
    surname: "Landa",
    email: "test_user_46542185@testuser.com",
    phone: {
        number: 5549737300,
        area_code: "52"
    },
    address: {
        zip_code: "03940",
        street_name: "Insurgentes Sur",
        street_number: 1602
    },
    identification: {
        type: "DNI", //https://api.mercadopago.com/v1/identification_types
        number: "22334445",
    },
};

const metodos_pago = {
    installments: 6,
    exclude_payment_methods: [
        {
            id: "diners",
        },
    ],
    exclude_payment_types: [
        {
            id: "atm",
        },
    ],
};

const preferencia = {
    items: [],
    back_urls: {
        success: "",
        pending: "",
        failure: "",
    },
    payment_methods: metodos_pago,
    payer: cliente,
    auto_return: "approved",
    notification_url: "", //Endpoint en el cula mercado pago mandara la actualizacion de nuestro pago mediane un metodo POST, nosotros le tenemos que responder un estado (200-201) para que no haga span en ese endpoint, OJO: no pomer la notoofocation_url en modo localhost ya que MP no creara la preferencia por declara una url  invalida (127.0.0.1 | localhost)
    external_reference: "hariasfrancia@gmail.com",
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', async function (req, res) {
    console.log(req.query);
    // Crear el objeto ITEM y agregarlo al array de ITEMS de la preferencia
    // {img: './assets/samsung-galaxy-s9-xxl.jpg', title: 'Samsung Galaxy S9', price: '15000', unit: '1'}
    const { img, title, price, unit } = req.query;
    const item = {
        id: "1234",
        title: title,
        description: "Dispositivo móvil  de Tienda e-commerce",
        picture_url: img,
        quantity: +unit,
        currency_id: "PEN",
        unit_price: +price,
    }
    preferencia.items.push(item);
    // Ahora modificamos las back_url para indicar el dominio de nuestra aplicacion
    preferencia.back_urls.failure = `${req.get('host')}/failure`; //http://127.0.0.1:5000
    preferencia.back_urls.success = `${req.get('host')}/success`;
    preferencia.back_urls.pending = `${req.get('host')}/pending`;
    preferencia.notification_url = `${req.get('host')}/notificaciones`; //esta propiedad se define antes de ya subir a produccion
    // el notificiation_url solo se puede usar en ambientes de produccion (no localhost ni 127.0.0.1) porque es a ese endpoint en el cual se mandara el estado de la pasarela de pago y por ende al identificar uno de los dominios anteriores lanzara un error y no se procedera con la pasarela
    // preferencia.noticication_url = `${req.get('host')}/notificaciones`
    const respuesta = await mercadopago.preferences.create(preferencia);
    console.log(respuesta);
    req.query.init_point = respuesta.body.init_point; // le hemso pasado a nuestro req.query el parametro llamado init_point
    req.query.id = respuesta.body.id;
    res.render('detail', req.query);
});

app.get("/success", function (req, res) {
    console.log(req.query);
    res.render("success", req.query);
});

app.get("/failure", function (req, res) {
    res.render("failure", req.query);
})

app.get("/pending", function (req, res) {
    res.render("pending", req.query);
})

app.post("/notificaciones", function (req, res) {
    console.log("INICIO DE NOTIFICACIONES");
    console.log("MEDIANTE EL QUERY PARAMS");
    console.log(req.query);
    console.log("MEDIANTE EL BODY");
    console.log(req.body);
    res.status(200);
})

app.listen(port);