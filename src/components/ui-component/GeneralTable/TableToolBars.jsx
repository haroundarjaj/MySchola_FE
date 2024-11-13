import { Add, Delete, Edit, GetApp, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { exportAsExcel } from './exportAsExcel';

const Toolbar = (data, title, columns, showAddButton, onAdd, tTable) => {
    return (
        <>
            <Tooltip title={tTable("download_excel")}>
                <IconButton onClick={() => exportAsExcel(data, title, columns)}>
                    <GetApp />
                </IconButton>
            </Tooltip>
            {showAddButton && (
                <Tooltip title={tTable("add")}>
                    <IconButton onClick={onAdd}>
                        <Add />
                    </IconButton>
                </Tooltip>
            )}
        </>
    );
}

const SelectToolbar = (
    data,
    selectedRows,
    setSelectedRows,
    showPreviewButton,
    onPreview,
    showEditButton,
    onEdit,
    showDeleteButton,
    onDelete,
    tTable
) => {
    const dataIndex = selectedRows.data.map(selectedRow => selectedRow.dataIndex);
    const elements = [];
    if (dataIndex.length > 0) {
        for (let i = 0; i < dataIndex.length; i++) {
            elements.push(data[dataIndex[i]]);
        }
    }
    return (
        <div style={{ paddingRight: 10 }}>
            {elements?.length === 1
                ? (
                    <>
                        {showPreviewButton && (
                            <Tooltip title={tTable("preview")}>
                                <IconButton onClick={() => {
                                    onPreview(elements[0]);
                                }}
                                >
                                    <Visibility />
                                </IconButton>
                            </Tooltip>
                        )}
                        {showEditButton && (
                            <Tooltip title={tTable("edit")}>
                                <IconButton onClick={() => {
                                    onEdit(elements[0]);
                                }}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        )}

                    </>
                ) : null
            }
            {showDeleteButton && (
                <Tooltip title={tTable("delete")}>
                    <IconButton onClick={() => {
                        onDelete(elements, setSelectedRows);
                    }}
                    >
                        <Delete />
                    </IconButton>
                </Tooltip>
            )
            }
        </div>
    );
}

export {
    Toolbar,
    SelectToolbar
}