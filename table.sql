-- Active: 1653331321827@@35.226.146.116@3306@silveira-21814331-eric-silva
CREATE TABLE Categorias (  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Chave primária da tabela',
    codigo VARCHAR(255) UNIQUE NOT NULL COMMENT 'Código da Categoria (slug)',
    titulo VARCHAR(255) NOT NULL COMMENT 'Título da Categoria',
    status INT COMMENT '0 - Inativo, 1 - Ativo'
);

CREATE TABLE Produtos (  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Chave primária da tabela',
    idCategoria INT NOT NULL COMMENT 'id da Categoria (fk)',
    codigo VARCHAR(255) UNIQUE NOT NULL COMMENT 'SKU do Produto',
    nome VARCHAR(255) NOT NULL COMMENT 'Nome do Produto',
    descricao TEXT NOT NULL COMMENT 'Descrição do Produto',
    valor FLOAT NOT NULL COMMENT 'Valor do Produto',
    status INT COMMENT '0 - Inativo, 1 - Ativo',
    FOREIGN KEY (idCategoria) REFERENCES Categorias(id)
);

CREATE TABLE Estoque (  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Chave primária da tabela',
    idProduto INT NOT NULL COMMENT 'id do Produto (fk)',
    quantidade INT NOT NULL COMMENT 'Quantidade em estoque',
    reserva INT NOT NULL COMMENT 'Quantidade reservada',
    status INT COMMENT '0 - Inativo, 1 - Ativo',
    FOREIGN KEY (idProduto) REFERENCES Produtos(id)
);