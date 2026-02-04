import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { Servicio, Producto, Taller, ItemType } from '@/lib/firebase/services'

type EditableBase =
  | Partial<Servicio>
  | Partial<Producto>
  | Partial<Taller>

type EditableItem = EditableBase & {
  type: ItemType
}

type AdminFormProps = {
  item: EditableItem | null
  onSave: (data: EditableItem) => void
  onCancel: () => void
  loading: boolean
}

export default function AdminForm({
  item,
  onSave,
  onCancel,
  loading
}: AdminFormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!item) return

    onSave(item)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <Label>Nombre</Label>
        <Input
          value={item?.nombre ?? ''}
          onChange={(e) =>
            onSave({
              ...item!,
              nombre: e.target.value
            })
          }
          required
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>

        <Button type="submit" disabled={loading}>
          Guardar
        </Button>
      </div>

    </form>
  )
}