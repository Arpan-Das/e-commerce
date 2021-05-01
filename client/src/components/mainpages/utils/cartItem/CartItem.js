import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1200,
    height: 450,
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    minWidth: 1000,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid({cart, grandTotal, setGrandTotal}) {
  const classes = useStyles();

  useEffect(() =>{
    const getTotal = () =>{
        const total = cart.reduce((prev, item) => {
            return prev + (item.price * item.quantity)
        },0)

        setGrandTotal(total)
    }
    getTotal()
  },[cart, setGrandTotal])

  return (
    <div className={classes.root} >
        <GridList cellHeight={200} id="gridList" className={classes.gridList}>
        {
          cart.map((product, index) =>(
            <div className="tile">
              <div className="no">
                <p>{index + 1}.</p>
              </div>
              <div className="tile__image">
                <img src={product.images.url} alt={product.product_id}/>
              </div>
              <div className="tile__detail">
                <div id="title">
                  <h4>{product.title}</h4>
                </div>
                <div id="description">
                  <p>{product.description}</p>
                </div>
                <div id="quantity">
                  <p>Quantity : {product.quantity}</p>
                </div>
              </div>
              <div className="tile__price">
                Rs. {product.price}
              </div>
            </div>
          ))
        }      
        </GridList>
    </div>
  );
}
