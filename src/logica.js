for (let i = 1; i <= 5; i++) {
    let asignacion = i.toString().padStart(2, '0');
    let objeto_existente = bpy.data.objects[asignacion];
    
    if (objeto_existente) {
        objeto_existente.scale.z = valor_z[i - 1];
    }
       console.log(objeto_existente);
}


//