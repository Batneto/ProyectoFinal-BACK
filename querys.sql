


-- Tabla de roles

CREATE TABLE roles(
  id_rol serial  PRIMARY KEY,
  rol VARCHAR(10) NOT NULL
)

-- Tabla usuarios

CREATE TABLE usuarios (
  id_usuarios serial NOT NULL PRIMARY KEY, 
  id_rol int ,
  nombre VARCHAR(50) NOT NULL,
  imagen_perfil VARCHAR(100),
  email VARCHAR(100) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  apodo VARCHAR(50),
  CONSTRAINT FK_roles
    FOREIGN KEY (id_rol)
      REFERENCES roles(id_rol) 
  ON DELETE CASCADE
);



-- Tabla de entradas

CREATE TABLE entradas (
  id_entradas serial NOT NULL PRIMARY KEY, 
  titulo VARCHAR(100) NOT NULL,
  contenido TEXT NOT NULL,
  imagen_producto VARCHAR(100) NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuarios INT NOT NULL REFERENCES usuarios(id_usuarios),
  id_categorias INT NOT NULL REFERENCES categorias(id_categorias),
  precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0)
);

-- Tabla de categorias

CREATE TABLE categorias (
  id_categorias serial NOT NULL PRIMARY KEY, 
  nombre VARCHAR(50) NOT NULL UNIQUE
);



--DATOS DE ROLES
INSERT INTO roles (rol) 
VALUES 
 ('admin'),
 ('user');
 



-- DATOS DE LOS USUARIOS

INSERT INTO usuarios (id_rol,nombre, imagen_perfil, email, pass, apodo) 
VALUES 
 ('1','Pepe Diaz', 'https://example.com/pepe.jpg','pepe@example.com','123', 'Don Pepe'),
 ('2','Juan Pérez', 'https://example.com/juan.jpg', 'juan@example.com', '123', 'juanito'),
 ('2','María Gómez', 'https://example.com/maria.jpg','maria@example.com', '123', 'mary');


--DATOS DE CATEGORIAS
INSERT INTO categorias (nombre) 
VALUES 
 ('Muñecos'),
 ('Juegos');


-- DATOS DE LAS ENTRIES

INSERT INTO entradas (id_usuarios, id_categorias, titulo, contenido,imagen_producto,precio) 
VALUES 
 (1, 1, 'Mi colección de muñecos', 'Hoy quiero compartir con ustedes mi colección de muñecos. Tengo más de 50 y los he coleccionado durante los últimos 10 años.','https://example.com/muñecos.jpg',14),
 (2, 2, 'Los mejores juegos de mesa', 'Soy una gran fan de los juegos de mesa y en este post','https://example.com/mesa.jpg',27); 