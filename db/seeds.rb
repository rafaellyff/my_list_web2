Categoria.create(descricao: "Terror")
Categoria.create(descricao: "Romance")
Categoria.create(descricao: "Comédia")
Categoria.create(descricao: "Ação")

Formato.create(descricao: "WMV")
Formato.create(descricao: "MP4")
Formato.create(descricao: "AVI")

Filme.create(titulo: "Alice no País das Maravilhas", duracao: "108", ano: "2010", formato_id: 1)

Serie.create(titulo: "The Originals", formato_id: 1)
Episodio.create(titulo: "Always and Forever", duracao: "50", serie_id: 1)