-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 15-Nov-2023 às 11:55
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbapisebo`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`id`, `nome`, `descricao`, `isDeleted`) VALUES
(1, 'Revista', 'Categoria de Revista', 0),
(2, 'Livro', 'Categoria de Livros', 0),
(3, 'Periodicos', 'Categoria de Periodicos', 1),
(4, 'Periodicos', 'Categoria de Periodicos', 1),
(5, 'Periodicos', 'Categoria de Periodicos', 1),
(6, 'Jornal', 'Categoria de Jornal', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `itens`
--

DROP TABLE IF EXISTS `itens`;
CREATE TABLE IF NOT EXISTS `itens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(300) DEFAULT NULL,
  `autor` varchar(500) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  `preco` float DEFAULT NULL,
  `descricao` varchar(600) DEFAULT NULL,
  `status` enum('ativo','inativo','fora de estoque','estoque') DEFAULT NULL,
  `data_edit` date DEFAULT NULL,
  `periodicidade` int DEFAULT NULL,
  `id_vendedor` int DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_vendedor` (`id_vendedor`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `itens`
--

INSERT INTO `itens` (`id`, `titulo`, `autor`, `id_categoria`, `preco`, `descricao`, `status`, `data_edit`, `periodicidade`, `id_vendedor`, `isDeleted`) VALUES
(1, 'A esperança', 'Suzanne Collins', 2, 24.5, 'Para evitar que sua irmã seja a mais nova vítima do programa, Katniss se oferece para participar em seu lugar. Vinda do empobrecido Distrito 12, ela sabe como sobreviver em um ambiente hostil. Peeta, um garoto que ajudou sua família no passado, também foi selecionado. Caso vença, terá fama e fortuna. Se perder, morre. Mas para ganhar a competição, será preciso muito mais do que habilidade. Até onde Katniss estará disposta a ir para ser vitoriosa nos Jogos Vorazes?', 'fora de estoque', '2012-02-15', 2, 5, 1),
(2, 'Harry Potter e a Câmara Secreta: 2', 'J.K. Rowling', 2, 25, 'Depois de férias aborrecidas na casa dos tios trouxas, está na hora de Harry Potter voltar a estudar. Coisas acontecem, no entanto, para dificultar o regresso de Harry. Persistente e astuto, o herói não se deixa intimidar pelos obstáculos e, com a ajuda dos fiéis amigos Weasley, começa o ano letivo na Escola de Magia e Bruxaria de Hogwarts. As novidades não são poucas. Novos colegas, novos professores, muitas e boas descobertas e um grande e perigosos desafio. Alguém ou alguma coisa ameaça a segurança e a tranquilidade dos membros de Hogwarts', 'estoque', '2017-08-09', 2, 2, 1),
(3, 'A Fúria dos Reis. As Crônicas de Gelo e Fogo', 'George R. R. Martin', 2, 23, 'Em A fúria dos reis, o segundo livro da aclamada série As crônicas de gelo e fogo, George R. R. Martin segue a épica aventura nos Sete Reinos, onde muitos perigos e disputas ainda estão por vir. Além dos combates que se estendem por todos os lados, a ameaça agora também chega pelo céu! Mistério, intriga, romance e aventura encherão as páginas deste livro, agora também um seriado de sucesso da HBO!', 'inativo', '2019-03-15', 2, 6, 0),
(6, 'A Fúria dos Reis. As Crônicas de Gelo e Fogo', 'George R. R. Martin', 2, 23, 'Em A fúria dos reis, o segundo livro da aclamada série As crônicas de gelo e fogo, George R. R. Martin segue a épica aventura nos Sete Reinos, onde muitos perigos e disputas ainda estão por vir. Além dos combates que se estendem por todos os lados, a ameaça agora também chega pelo céu! Mistério, intriga, romance e aventura encherão as páginas deste livro, agora também um seriado de sucesso da HBO!', 'inativo', '2019-03-15', 2, 6, 0),
(4, 'O Senhor dos Anéis: Volume único', 'J.R.R. TOLKIEN', 2, 20, 'Este volume está composto pela primeira (A Sociedade do Anel), segunda (As Duas Torres) e terceira parte (O Retorno do Rei) da grande obra de ficção fantástica de J. R. R. Tolkien, O Senhor dos Anéis.É impossível transmitir ao novo leitor todas as qualidades e o alcance do livro. Alternadamente cômica, singela, épica, monstruosa e diabólica, a narrativa desenvolve-se em meio a inúmeras mudanças de cenários e de personagens, num mundo imaginário absolutamente convincente em seus detalhes. Nas palavras do romancista Richard Hughes, “quanto à amplitude imaginativa, a obra praticamente não tem par', 'ativo', '2001-01-01', 2, 4, 1),
(5, 'A Guerra dos Tronos : As Crônicas de Gelo e Fogo, volume 1', 'George R. R. Martin', 2, 20, 'A guerra dos tronos é o primeiro livro da série best-seller internacional As Crônicas de Gelo e Fogo, que deu origem à adaptação de sucesso da HBO, Game of Thrones. O verão pode durar décadas. O inverno, toda uma vida. E a guerra dos tronos começou. Como Guardião do Norte, lorde Eddard Stark não fica feliz quando o rei Robert o proclama a nova Mão do Rei. Sua honra o obriga a aceitar o cargo e deixar seu posto em Winterfell para rumar para a corte, onde os homens fazem o que lhes convém, não o que devem... e onde um inimigo morto é algo a ser admirado', 'ativo', '2019-03-25', 2, 5, 0),
(7, 'A Guerra dos Tronos : As Crônicas de Gelo e Fogo, volume 1', 'George R. R. Martin', 2, 20, 'A guerra dos tronos é o primeiro livro da série best-seller internacional As Crônicas de Gelo e Fogo, que deu origem à adaptação de sucesso da HBO, Game of Thrones. O verão pode durar décadas. O inverno, toda uma vida. E a guerra dos tronos começou. Como Guardião do Norte, lorde Eddard Stark não fica feliz quando o rei Robert o proclama a nova Mão do Rei. Sua honra o obriga a aceitar o cargo e deixar seu posto em Winterfell para rumar para a corte, onde os homens fazem o que lhes convém, não o que devem... e onde um inimigo morto é algo a ser admirado', 'ativo', '2019-03-25', 2, 5, 0),
(8, 'A Fúria dos Reis. As Crônicas de Gelo e Fogo', 'George R. R. Martin', 2, 23, 'Em A fúria dos reis, o segundo livro da aclamada série As crônicas de gelo e fogo, George R. R. Martin segue a épica aventura nos Sete Reinos, onde muitos perigos e disputas ainda estão por vir. Além dos combates que se estendem por todos os lados, a ameaça agora também chega pelo céu! Mistério, intriga, romance e aventura encherão as páginas deste livro, agora também um seriado de sucesso da HBO!', 'inativo', '2019-03-15', 2, 6, 1),
(9, 'A Guerra dos Tronos : As Crônicas de Gelo e Fogo, volume 1', 'George R. R. Martin', 2, 20, 'A guerra dos tronos é o primeiro livro da série best-seller internacional As Crônicas de Gelo e Fogo, que deu origem à adaptação de sucesso da HBO, Game of Thrones. O verão pode durar décadas. O inverno, toda uma vida. E a guerra dos tronos começou. Como Guardião do Norte, lorde Eddard Stark não fica feliz quando o rei Robert o proclama a nova Mão do Rei. Sua honra o obriga a aceitar o cargo e deixar seu posto em Winterfell para rumar para a corte, onde os homens fazem o que lhes convém, não o que devem... e onde um inimigo morto é algo a ser admirado', 'ativo', '2019-03-25', 2, 5, 0),
(10, 'A Guerra dos Tronos : As Crônicas de Gelo e Fogo, volume 1', 'George R. R. Martin', 2, 20, 'A guerra dos tronos é o primeiro livro da série best-seller internacional As Crônicas de Gelo e Fogo, que deu origem à adaptação de sucesso da HBO, Game of Thrones. O verão pode durar décadas. O inverno, toda uma vida. E a guerra dos tronos começou. Como Guardião do Norte, lorde Eddard Stark não fica feliz quando o rei Robert o proclama a nova Mão do Rei. Sua honra o obriga a aceitar o cargo e deixar seu posto em Winterfell para rumar para a corte, onde os homens fazem o que lhes convém, não o que devem... e onde um inimigo morto é algo a ser admirado', 'ativo', '2019-03-25', 2, 5, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `transacoes`
--

DROP TABLE IF EXISTS `transacoes`;
CREATE TABLE IF NOT EXISTS `transacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_comprador` int DEFAULT NULL,
  `id_vendedor` int DEFAULT NULL,
  `id_item` int DEFAULT NULL,
  `data_transacao` date DEFAULT NULL,
  `valor` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_comprador` (`id_comprador`),
  KEY `id_vendedor` (`id_vendedor`),
  KEY `id_item` (`id_item`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `transacoes`
--

INSERT INTO `transacoes` (`id`, `id_comprador`, `id_vendedor`, `id_item`, `data_transacao`, `valor`) VALUES
(1, 2, 3, 1, '2017-08-19', 40.3),
(2, 4, 1, 1, '2020-08-19', 77.3),
(3, 4, 1, 1, '2020-08-19', 77.3),
(4, 4, 1, 1, '2020-08-19', 77.3),
(5, 4, 1, 1, '2020-08-19', 77.3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` enum('ativo','inativo') DEFAULT NULL,
  `tipo` enum('comprador','vendedor','administrador') DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  `area` varchar(40) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `status`, `tipo`, `senha`, `data_inicio`, `area`, `isDeleted`) VALUES
(1, 'Thiago', 'thi@outlook.com', 'ativo', 'administrador', '$2b$10$G14LLE6p0hLP1S8HPkLw7umuc/OwKwWOtXg50cFj7tr0ny914.hQe', '2023-10-10', 'MKT', 0),
(2, 'Thiago', 'thi@outlook.com', 'ativo', 'administrador', '$2b$10$PrqjySinvVT6UzF89NHTV.lBFXLh85PfFJcIu.X.5cbFdvnWXmQ/W', '2023-10-10', 'MKT', 1),
(3, 'Thiago', 'thi@outlook.com', 'ativo', 'administrador', '$2b$10$nypBWNEytb4K/cVwTq65AuGQDImLFzRfBviTmoyiFkwKVGYVOvUS2', '2023-10-10', 'MKT', 1),
(4, 'Thiago', 'thi@outlook.com', 'ativo', 'administrador', '$2b$10$2kLTGUekYAAeRUrzvhNxYu/ozL8a9qb8qz9WWYeVGeGpneY9/RnGa', '2023-10-10', 'MKT', 1),
(5, 'alberto', 'usuario@email', 'ativo', 'vendedor', '$2b$10$wU7JXvIQKWTujnpoRQAW7ORP6nlyj9g94AD8PkqC5u8IdfTEtuj4i', '2023-10-02', 'vendas', 1),
(6, 'Thiago', 'thi@outlook.com', 'ativo', 'administrador', '$2b$10$rOOkFvJwwknnmC2Nc6Db..3QjMZAwMwffDCjiAEWAaZi2D5ik4Sp.', '2023-10-10', 'MKT', 0),
(7, 'Leonardo Galindo', 'leonardogalindo8@gmail.com', 'inativo', 'vendedor', '$2b$10$9YcMTI4nm89auX44ai9/GuA2tBujg78/YyCkESVDGcWvOfCZwO03.', NULL, NULL, 0),
(8, 'Leonardo Galindo', 'leonardogalindo8@outlook.com', 'ativo', 'administrador', '$2b$10$OONO6FAAppL3AiJ7fICz/uQ6ST8L.lIDAlP2ALNsyUXcIEpkeNuty', '2023-10-02', 'vendas', 0),
(9, 'Leonardo Galindo', 'leonardogalindo8@gmail.com', 'inativo', 'vendedor', '$2b$10$P8V4Jnsqa/hjyTkezlBTAubNYHwi1DIUlVPamNmMDlI2XwxBWdpcy', NULL, NULL, 0),
(10, 'Leonardo Galindo', 'leonardogalindo8@outlook.com', 'ativo', 'administrador', '$2b$10$yoiKjOYehwVGODnGzuQ0rOSGyeFdfvN.e90xbzJW39mfMus4bk4Nq', '2023-10-02', 'vendas', 0),
(11, 'Leonardo Galindo', 'leonardogalindo8@gmail.com', 'inativo', 'vendedor', '$2b$10$fEArL6RS2UL0x.GxfB0x0.Dmz29eBceQZ98xFRfGflpdZBvzUVcgW', NULL, NULL, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
