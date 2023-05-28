"use client";
import React from 'react';
import MUIDataTable from "mui-datatables";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AjoutCat from './ajoutCategorie';
import UpdateCategory from './updateCategory';

const affTableCategories = (props) => {
    const [categories, setCategories] = React.useState(props.categories)
    //Pour actualiser la liste
    const getCategories = async () => {
        const res = await fetch('http://localhost:3001/api/categories')
        const categories = await res.json();
        setCategories(categories)
    }
    React.useEffect(() => {
        getCategories();

    }, [categories]);
    const handleDelete = async (id) => {
        if (window.confirm("Do You Wanna Delete This Categorie?")) {
            const res = await (await
                fetch('http://localhost:3001/api/categories/' + id, {
                    method: "DELETE"
                })).json();
            if (res) {
                const newCategories = categories.filter((item) => item.id !== id);
                setCategories(newCategories);

            } else {
                console.log(res);
            }
        }
    }
    const columns = [
        {
            label: "Name",
            name: "name"
        },
        {
            label: "Image",
            name: "image",
            options: {
                customBodyRender: (rowdata) => (
                    <img
                        style={{ height: 50, width: 60, borderRadius: '10%' }}
                        src={`${rowdata}`}
                        alt=""
                    />
                )
            }
        },
        {
            name: "_id",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div>

                        <UpdateCategory categories={categories[tableMeta.rowIndex]} />

                        <span
                            onClick={(e) => handleDelete(value)}
                            style={{ cursor: 'pointer' }}
                        >
                            <DeleteForeverRoundedIcon color='error' />
                        </span>
                    </div>
                )
            }
        }
    ];

    const options = {
        filter: true,
        serverSide: true,
        sort : true,
        print: false,
        download: false,
        search: true,
        searchPlaceholder: 'Search For Your Desired Product Here',
        viewColumns: false,
        selectableRowsHideCheckboxes : true,
    }

    return (
        <>
            <AjoutCat />
            {categories && categories?.length > 0 ?

                <MUIDataTable
                    title="Categories List"
                    data={categories}
                    columns={columns}
                    options={options}
                />

                : null}
        </>
    )
}
export default affTableCategories;