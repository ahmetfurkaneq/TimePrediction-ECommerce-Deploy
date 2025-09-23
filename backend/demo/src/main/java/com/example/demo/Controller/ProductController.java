package com.example.demo.Controller;


import com.example.demo.DTO.ProductDTO;
import com.example.demo.DTO.UserDTO;
import com.example.demo.Data.Product;
import com.example.demo.Data.User;
import com.example.demo.Service.ProductService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService){
        this.productService=productService;
    }



    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable String category){

        List<ProductDTO> products=productService.getProductsByCategory(category);
        if (products.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/allProducts")
    public ResponseEntity<List<ProductDTO>> getAllProducts(){
        List<ProductDTO> products=productService.getAllProducts();
        if (products.isEmpty()){
            return  ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @PostMapping("/buyProduct/{id}")
    public ResponseEntity<Boolean> purchaseProduct(
            @PathVariable Long id )
    {
        boolean ispurchasedProduct = productService.purchaseProduct(id);

        if (!ispurchasedProduct){
            ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(ispurchasedProduct);
    }


    @GetMapping("/categories")
    public ResponseEntity<List<String>> getProductCategories(){


        List<String> categories = productService.getProductsCategories();

        return ResponseEntity.ok(categories);
    }







}
