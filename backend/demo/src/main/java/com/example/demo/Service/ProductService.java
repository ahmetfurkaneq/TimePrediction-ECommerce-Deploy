package com.example.demo.Service;

import com.example.demo.DTO.ProductDTO;
import com.example.demo.Data.Product;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ProductService {


    List<ProductDTO> getAllProducts();

    boolean purchaseProduct(Long id);

    List<ProductDTO> getProductsByCategory(String category);

    List<String> getProductsCategories();



}
