"use client";
import React from 'react';
import MUIDataTable from 'mui-datatables';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import UpdateProduct from './updateProduct';
import AjoutProd from './ajoutProduct';

const AffTableProducts = ({ props }) => {
    const [articles, setArticles] = React.useState(props)
    //Pour actualiser la liste
    const getArticles = async () => {
        const res = await fetch('http://localhost:3001/api/articles')
        const articles = await res.json();
        setArticles(articles)
    }
    React.useEffect(() => {
        getArticles();

    }, [articles]);

    const handleDelete = async (id) => {
        if (window.confirm("Do You Wanna Delete This Product?")) {
            const res = await (await
                fetch('http://localhost:3001/api/articles/' + id, {
                    method: "DELETE"
                })).json();
            if (res) {
                const newProduct = articles.filter((item) => item.id !== id);
                setArticles(newProduct);

            } else {
                console.log(res);
            }
        }
    }

    const columns = [
        {
            label: 'Title',
            name: 'title',
        },
        {
            label: 'Price',
            name: 'price',
        },
        {
            label: 'Description',
            name: 'description',
        },
        {
            label: 'Image',
            name: 'images',
            options: {
                customBodyRender: (rowdata) => (
                    <img style={{ height: 40, width: 60, borderRadius: '10%' }} src={`${rowdata}`} alt="" />
                ),
            },
        },
        {
            name: "_id",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div>

                        <UpdateProduct articles={articles[tableMeta.rowIndex]} />

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
        print: false,
        download: false,
        search: true,
        searchPlaceholder: 'Search For Your Desired Product Here',
        viewColumns: false,
        selectableRowsHideCheckboxes : true,
    };

    return (
        <>
            <AjoutProd/>
            {articles && articles.length > 0 ? (
                <MUIDataTable 
                title="Products List" 
                data={articles} 
                columns={columns} 
                options={options} />
            ) : null}
        </>
    );
};

export default AffTableProducts;
