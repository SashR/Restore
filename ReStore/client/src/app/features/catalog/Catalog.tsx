import ProductList from "./ProductList";
import { useEffect } from "react";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductsAsync, productsSelectors } from "../../store/slices/productsSlice";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to Low'},
  {value: 'price', label: 'Price - Low to High'},
]

const Catalog = () => {
    const {productsLoaded, status , brands, types} = useAppSelector(state => state.products);
    const products = useAppSelector(productsSelectors.selectAll);
    const dispatch = useAppDispatch();

  // Call for data from server, no dependencies
    useEffect(()=>{ 
      if(!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch]);

    if(status === 'pendingFetchProducts') return <LoadingComponent message="Loading products ..." />;

    return (
      <Grid container spacing={4} sx={{marginTop:10, marginBottom: 4}}>
        <Grid item xs={3}>
          {/* Search */}
          <Paper sx={{mb:2}}>
            <TextField label='Search products' variant='outlined' fullWidth />
          </Paper>
          {/* Sort by  */}
          <Paper sx={{mb:2, p:2}}>
            <FormControl>
              <RadioGroup>
                {sortOptions.map(({value, label}) => (
                  <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>
          {/* Filter by */}
          <Paper sx={{mb:2, p:2}}>
            <FormGroup>
              {brands.map(b => <FormControlLabel key={b} control={<Checkbox/>} label={b} />)}
            </FormGroup>
          </Paper>
          <Paper sx={{mb:2, p:2}}>
            <FormGroup>
              {types.map(t => <FormControlLabel key={t} control={<Checkbox/>} label={t} />)}
            </FormGroup>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
           <Typography>
            Displaying 1-6 of 20 items
           </Typography>
           <Pagination count={10} page={2} color="secondary" size="large" />
          </Box>
        </Grid>
      </Grid>
    )
}

export default Catalog;