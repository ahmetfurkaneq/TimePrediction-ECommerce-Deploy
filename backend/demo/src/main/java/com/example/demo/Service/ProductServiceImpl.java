package com.example.demo.Service;

import com.example.demo.DTO.ProductDTO;
import com.example.demo.Data.Product;
import com.example.demo.Data.User;
import com.example.demo.Repository.ProductRepo;
import com.example.demo.Repository.UserRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final UserRepo userRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductServiceImpl(ProductRepo productRepo, UserRepo userRepo, ModelMapper modelMapper) {
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepo.findAll();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }



    @Override
    @Transactional
    public boolean purchaseProduct(Long id) {
        Optional<Product> product = productRepo.findById(id);
        if (product == null || product.get().getStock() <= 0) {
            return false;
        }
        Optional<User> userOptional = userRepo.findById(id);
        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();
        if (user.getBudget() < product.get().getPrice()) {
            return false;
        }
        product.get().setStock(product.get().getStock() - 1);
        user.setBudget(user.getBudget() - product.get().getPrice());
        Product product1=product.get();
        productRepo.save(product1);
        userRepo.save(user);
        return true;
    }



    @Override
    @Transactional
    public List<ProductDTO> getProductsByCategory(String category) {
        List<Product> products = productRepo.findByCategory(category);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getProductsCategories() {
        return productRepo.getDistinctCategories();
    }

}
