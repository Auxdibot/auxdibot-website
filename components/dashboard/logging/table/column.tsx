import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/components/ui/user';
import { LogType } from '@/lib/types/LogType';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';



export const columns: ColumnDef<LogType>[] = [
    {
      accessorKey: "type",
      cell: ({ row }) => {
        return row.original.type.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
    },
    {
      accessorKey: "userID",
      cell: ({ row }) => {
        const userID = row.original.userID;

        return (<User userID={userID} />)
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
    },
    {
      accessorKey: "date_unix",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.date_unix);
        return date.toLocaleDateString();
      }
    },
  ]