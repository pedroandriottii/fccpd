import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

interface Todo {
  id: number
  category?: Category
  categoryId?: number
  title: string
  description?: string
  dueDate: string
}

interface Category {
  id: number
  name: string
}

const Todo: React.FC = () => {
  const { toast } = useToast()
  const [todos, setTodos] = useState<Todo[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id'>>({
    title: '',
    description: '',
    dueDate: '',
    category: undefined,
  })
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({
    name: '',
  })
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  useEffect(() => {
    fetchTodos()
    fetchCategories()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      const data = await response.json()
      setTodos(data)
      toast({
        title: 'Todos loaded successfully',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error fetching Todos',
      })
      console.error('Error fetching todos:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/category', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      const data = await response.json()
      setCategories(data)
      toast({
        title: 'Categories loaded successfully',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error fetching categories',
      })
      console.error('Error fetching categories:', error)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (editingTodo) {
      setEditingTodo({ ...editingTodo, [name]: value })
    } else {
      setNewTodo({ ...newTodo, [name]: value })
    }
  }

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value })
    } else {
      setNewCategory({ ...newCategory, [name]: value })
    }
  }

  const handleTodoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTodo) {
      await updateTodo(editingTodo)
    } else {
      await createTodo(newTodo)
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      await updateCategory(editingCategory)
    } else {
      await createCategory(newCategory)
    }
  }

  const createTodo = async (todo: Omit<Todo, 'id'>) => {
    try {
      const formattedDueDate = new Date(todo.dueDate).toISOString()

      const response = await fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ ...todo, dueDate: formattedDueDate }),
      })

      const newTodoItem = await response.json()
      setTodos([...todos, newTodoItem])
      setNewTodo({ title: '', description: '', dueDate: '', category: undefined })
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const updateTodo = async (todo: Todo) => {
    try {
      const formattedDueDate = new Date(todo.dueDate).toISOString()

      const response = await fetch(`http://localhost:3000/todo/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ ...todo, dueDate: formattedDueDate }),
      })
      const updatedTodo = await response.json()
      setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)))
      setEditingTodo(null)
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const createCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3000/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(category),
      })

      const newCategoryItem = await response.json()
      setCategories([...categories, newCategoryItem])
      setNewCategory({ name: '' })
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  const updateCategory = async (category: Category) => {
    try {
      const response = await fetch(`http://localhost:3000/category/${category.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(category),
      })
      const updatedCategory = await response.json()
      setCategories(
        categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
      )
      setEditingCategory(null)
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }
  console.log(categories)
  console.log(todos)
  const deleteCategory = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/category/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      setCategories(categories.filter((category) => category.id !== id))
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Todo Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingTodo ? 'Edit Todo' : 'Create New Todo'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTodoSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Title"
              value={editingTodo ? editingTodo.title : newTodo.title}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={editingTodo ? editingTodo.description : newTodo.description}
              onChange={handleInputChange}
            />
            <Input
              name="dueDate"
              type="date"
              value={editingTodo ? editingTodo.dueDate : newTodo.dueDate}
              onChange={handleInputChange}
              required
            />
            <Select
              value={
                editingTodo
                  ? editingTodo.category?.id.toString() ?? ''
                  : newTodo.category?.id.toString() ?? ''
              }
              onValueChange={(value) => {
                const selectedCategory = categories.find((category) => category.id === parseInt(value))
                if (editingTodo) {
                  setEditingTodo({ ...editingTodo, category: selectedCategory, categoryId: selectedCategory?.id })
                } else {
                  setNewTodo({ ...newTodo, category: selectedCategory, categoryId: selectedCategory?.id  })
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nenhum valor" >No Category</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit">
              {editingTodo ? 'Update Todo' : 'Create Todo'}
            </Button>
            {editingTodo && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingTodo(null)}
              >
                Cancel
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Todo List */}
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.description}</TableCell>
                  <TableCell>
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {categories.find((c) => c.id === todo.category?.id)?.name ||
                      'No Category'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingTodo(todo)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingCategory ? 'Edit Category' : 'Create New Category'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Category Name"
              value={editingCategory ? editingCategory.name : newCategory.name}
              onChange={handleCategoryInputChange}
              required
            />
            <Button type="submit">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </Button>
            {editingCategory && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Category List */}
      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Todo
