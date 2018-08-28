const fs = require('fs');

let listadoPorHacer = [];

let guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    // let fileData = fs.open('./db/data.json');
    // fileData += data;
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err)
            throw new Error('No se puedo grabar');
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    // console.log(listadoPorHacer);
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    // return new Promise((resolve, reject) => {
    //     try {
    //         listadoPorHacer = require('../db/data.json');
    //     } catch (error) {
    //         reject('No existen tareas por hacer');
    //     }
    //     resolve(listadoPorHacer);
    // })
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        // reject('No existen tareas por hacer');
        listadoPorHacer = [];
    }
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}