const HOST = 'http://localhost:1337'

export type Todo = {
  id: number
  documentId: string
  title: string
  isDone: boolean
}
export type Note = {
  id: number
  documentId: string
  title: string
  todoList?: Todo[]
}

type NoteData = {
  data: Note[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
export async function getNotes(): Promise<NoteData> {
  const resp = await fetch(`${HOST}/api/notes?populate=*`, { method: 'GET' })

  return resp.json()
}

export async function getNote(documentId: string) {
  const resp = await fetch(`${HOST}/api/notes/${documentId}?populate=*`, {
    method: 'GET',
  })

  return resp.json()
}

export async function addNote(noteTitle: string) {
  const resp = await fetch(`${HOST}/api/notes`, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        title: noteTitle,
      },
    }),

    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return resp.json()
}

export async function updateNote(note: Note) {
  const resp = await fetch(`${HOST}/api/notes/${note.documentId}`, {
    method: 'PUT',
    body: JSON.stringify({
      data: {
        title: note.title,
      },
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  return resp.json()
}

export async function deleteNote(documentId: string) {
  await fetch(`${HOST}/api/notes/${documentId}`, {
    method: 'DELETE',
  })
}

export async function addTodo(todo: Todo) {
  const resp = await fetch(`${HOST}/api/todos`, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        title: todo.title,
        isDone: false,
      },
    }),

    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  return resp.json()
}

export async function updateTodo(todo: Todo) {
  const resp = await fetch(`${HOST}/api/todos/${todo.documentId}`, {
    method: 'PUT',
    body: JSON.stringify({
      data: {
        title: todo.title,
        isDone: todo.isDone,
      },
    }),

    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  return resp.json()
}

export async function deleteTodo(documentId: string) {
  await fetch(`${HOST}/api/todos/${documentId}`, {
    method: 'DELETE',
  })
}
