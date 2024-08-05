import {flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable} from "@tanstack/react-table";
import Tribal from "./core/tribal.ts";
import {toData, columns} from "./core/converter.ts";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleChevronUp, faCircleChevronDown} from "@fortawesome/free-solid-svg-icons";

function PrimeTable({tribal}: { tribal: Tribal }) {


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState([...toData(tribal)])
    const [sorting, setSorting] = useState<SortingState>([]);

    useEffect(() => {
        const defaultData = toData(tribal);
        setData(defaultData);
    }, [tribal]);


    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        enableSortingRemoval: false,
        state: {
            sorting
        },
        enableMultiSort: false
    });

    function icon(value) {
        if (value === "asc") {
            return <FontAwesomeIcon icon={faCircleChevronUp} opacity={25}></FontAwesomeIcon>
        } else if (value === "desc") {
            return <FontAwesomeIcon icon={faCircleChevronDown} opacity={25}></FontAwesomeIcon>
        } else {
            return <div></div>
        }
    }

    return (
        <div className="p-2">
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? "cursor-pointer select-none"
                                                : "",
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}
                                    >

                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {
                                            icon(header.column.getIsSorted())
                                        }

                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
                <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.footer,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </tfoot>
            </table>
        </div>
    )
        ;
}

export default PrimeTable