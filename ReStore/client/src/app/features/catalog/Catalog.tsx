import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Pagination, Paper, Typography } from "@mui/material";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchFiltersAsync, fetchProductsAsync, productsSelectors, setProductParams } from "../../store/slices/productsSlice";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../../components/RadioButtonGroup";
import CheckboxButtonGroup from "../../../components/CheckboxButtonGroup";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to Low'},
  {value: 'price', label: 'Price - Low to High'},
]

const Catalog = () => {
    const {productsLoaded, status , brands, types, productsParams: params} = useAppSelector(state => state.products);
    const products = useAppSelector(productsSelectors.selectAll);
    const dispatch = useAppDispatch();

    const [selBrands, setSelBrands] = useState((new Array(brands.length)).fill(false));
    const togBrands = (i:number) => {
      const brandsFilters = [...selBrands.slice(0,i),!selBrands[i],...selBrands.slice(i+1,selBrands.length)];
      dispatch(setProductParams({brands: brands.filter((_,i)=>brandsFilters[i])}));
      setSelBrands(brandsFilters);
    };
  // Call for data from server, no dependencies
    useEffect(()=>{ 
      if(!productsLoaded) {
        dispatch(fetchFiltersAsync());
        dispatch(fetchProductsAsync());
      }
    }, [productsLoaded, dispatch, params]);

    if(status === 'pendingFetchProducts') return <LoadingComponent message="Loading products ..." />;

    return (
      <Grid container spacing={4} sx={{marginTop:10, marginBottom: 4}}>
        <Grid item xs={3}>
          {/* Search */}
          <Paper sx={{mb:2}}>
            <ProductSearch />
          </Paper>
          {/* Order by  */}
          <Paper sx={{mb:2, p:2}}>
            <RadioButtonGroup 
              options={sortOptions} 
              selectedValue={params.orderBy}  
              onChange={(event:any)=>{dispatch(setProductParams({orderBy: event.target.value}))}}
            />
          </Paper>
          {/* Filter by */}
          <Paper sx={{mb:2, p:2}}>
            <CheckboxButtonGroup options={brands} toggle={(i:number)=>togBrands(i)} />
            {/* <FormGroup>
              {brands.map(b => <FormControlLabel key={b} control={<Checkbox/>} label={b} name='brands' />)}
            </FormGroup> */}
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