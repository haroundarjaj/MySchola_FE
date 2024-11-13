import React from 'react';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import getTableLabels from './TableLabels';
import { useTheme } from '@emotion/react';
import { generateTheme } from './TableTheme';
import { SelectToolbar, Toolbar } from './TableToolBars';

function GeneralTable(props) {
    const {
        title,
        data,
        columns,
        loading,
        showAddButton,
        onAdd,
        showPreviewButton,
        onPreview,
        showEditButton,
        onEdit,
        showDeleteButton,
        onDelete,
        showToolBar,
        selectableRows
    } = props;

    console.log(data)
    const tTable = useTranslation('generalTable').t;
    const theme = useTheme();

    const options = {
        filter: true,
        fixedHeader: true,
        selectableRows: selectableRows,
        filterType: 'dropdown',
        responsive: 'standard',
        rowsPerPage: 5,
        elevation: 0,
        rowsPerPageOptions: [5, 10, 25, 100],
        page: 0,
        print: true,
        download: true,
        downloadOptions: {
            filename: title + '.csv'
        },
        onDownload: (buildHead, buildBody, columns, data) => '\uFEFF' + buildHead(columns).replaceAll('"', '') + buildBody(data).replaceAll('"', ''),
        draggableColumns: {
            enabled: true,
            transitionTime: 300
        },
        textLabels: getTableLabels(tTable, loading),
        customSearch: (searchQuery, currentRow, columns) => {
            return currentRow.some((cell) => {
                return cell?.toString().toLowerCase().includes(searchQuery.toLowerCase());
            });
        },
        customToolbar: () => Toolbar(data, title, columns, showAddButton, onAdd, tTable),
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => SelectToolbar(
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
        )
    };


    return (
        <div>
            <ThemeProvider theme={generateTheme(theme, showToolBar)}>
                <MUIDataTable
                    // title={title}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </div>
    );
}

GeneralTable.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    showAddButton: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    showPreviewButton: PropTypes.bool.isRequired,
    onPreview: PropTypes.func.isRequired,
    showEditButton: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    showDeleteButton: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    showToolBar: PropTypes.bool.isRequired,
    selectableRows: PropTypes.string.isRequired
}

GeneralTable.defaultProps = {
    title: '',
    data: [],
    columns: [],
    loading: false,
    showAddButton: true,
    onAdd: () => { },
    showPreviewButton: false,
    onPreview: () => { },
    showEditButton: false,
    onEdit: () => { },
    showDeleteButton: false,
    onDelete: () => { },
    showToolBar: true,
    selectableRows: 'none'
}


export default GeneralTable;