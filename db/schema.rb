# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_19_215536) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categoria_filmes", force: :cascade do |t|
    t.bigint "filme_id"
    t.bigint "categoria_id"
    t.boolean "ativo", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["categoria_id"], name: "index_categoria_filmes_on_categoria_id"
    t.index ["filme_id"], name: "index_categoria_filmes_on_filme_id"
  end

  create_table "categoria_series", force: :cascade do |t|
    t.bigint "serie_id"
    t.bigint "categoria_id"
    t.boolean "ativo", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["categoria_id"], name: "index_categoria_series_on_categoria_id"
    t.index ["serie_id"], name: "index_categoria_series_on_serie_id"
  end

  create_table "categorias", force: :cascade do |t|
    t.string "descricao"
    t.boolean "ativo", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "episodios", force: :cascade do |t|
    t.string "titulo"
    t.integer "duracao"
    t.bigint "serie_id"
    t.boolean "ativo", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["serie_id"], name: "index_episodios_on_serie_id"
  end

  create_table "filmes", force: :cascade do |t|
    t.string "titulo"
    t.integer "duracao"
    t.string "foto"
    t.integer "ano"
    t.bigint "formato_id"
    t.bigint "usuario_id"
    t.boolean "ativo", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["formato_id"], name: "index_filmes_on_formato_id"
    t.index ["usuario_id"], name: "index_filmes_on_usuario_id"
  end

  create_table "formatos", force: :cascade do |t|
    t.string "descricao"
    t.boolean "ativo", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "series", force: :cascade do |t|
    t.string "titulo"
    t.string "foto"
    t.bigint "formato_id"
    t.bigint "usuario_id"
    t.boolean "ativo", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["formato_id"], name: "index_series_on_formato_id"
    t.index ["usuario_id"], name: "index_series_on_usuario_id"
  end

  create_table "usuarios", force: :cascade do |t|
    t.string "nome", null: false
    t.string "login", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_usuarios_on_email", unique: true
    t.index ["reset_password_token"], name: "index_usuarios_on_reset_password_token", unique: true
  end

  add_foreign_key "categoria_filmes", "categorias"
  add_foreign_key "categoria_filmes", "filmes"
  add_foreign_key "categoria_series", "categorias"
  add_foreign_key "categoria_series", "series"
  add_foreign_key "episodios", "series"
  add_foreign_key "filmes", "formatos"
  add_foreign_key "filmes", "usuarios"
  add_foreign_key "series", "formatos"
  add_foreign_key "series", "usuarios"
end
