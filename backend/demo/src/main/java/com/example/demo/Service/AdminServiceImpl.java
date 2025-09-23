package com.example.demo.Service;

import com.example.demo.DTO.ProductDTO;
import com.example.demo.DTO.UserDTO;
import com.example.demo.Data.Product;
import com.example.demo.Data.User;
import com.example.demo.Repository.ProductRepo;
import com.example.demo.Repository.UserRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminServiceImpl implements AdminService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ModelMapper modelMapper;

    public AdminServiceImpl(UserRepo userRepo, ProductRepo productRepo, ModelMapper modelMapper) {
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.modelMapper = modelMapper;
    }


    @Override
    public void addProduct(ProductDTO dto){
        Product product= modelMapper.map(dto, Product.class);
        productRepo.save(product);
    }

    @Override
    public void updateProduct(Long id, ProductDTO dto) {
        Optional<Product> existedProduct=productRepo.findById(id);
    if (existedProduct.isPresent()){
        Product product=existedProduct.get();

        Optional<Integer> stock= Optional.of(dto.getStock());
        Optional<Double> price= Optional.of(dto.getPrice());

        if (dto.getName()!=null)product.setName(dto.getName());
        if (price != null)product.setStock(dto.getStock());
        if (dto.getCategory()!=null)product.setCategory(dto.getCategory());
        if (stock !=null)product.setName(dto.getName());

        productRepo.save(product);
    }
    else {
        throw new RuntimeException("Urun Bulunamadi: "+id);
    }


    }

    @Override
    public void deleteProduct(Long id) {
        if (productRepo.existsById(id)){
            productRepo.deleteById(id);
        }
        else {
            throw new RuntimeException("Silinecek urun bulunamadi:  "+id);
        }
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user,UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void updateUserBalance(String username, double amount) {
        Optional<User> userOpt=userRepo.findByUsername(username);
        if(userOpt.isPresent()){
            User user=userOpt.get();
            user.setBudget(user.getBudget()+amount);
            userRepo.save(user);
        }
        else {
            throw new RuntimeException("Kullanici Bulunamadi"+username);

        }
    }



    @Override
    public void editUser(UserDTO userDTO) {
    Optional<User> existingUser=userRepo.findById(userDTO.getId());


        if (userDTO.getUsername() != null) user.setUsername(userDTO.getUsername());
        if (userDTO.get() != null) user.setEmail(userDTO.getEmail());
        if (userDTO.getFirstName() != null) user.setFirstName(userDTO.getFirstName());
        if (userDTO.getLastName() != null) user.setLastName(userDTO.getLastName());
        if (userDTO.getRole() != null) user.setRole(userDTO.getRole());
        if (userDTO.getIsActive() != null) user.setIsActive(userDTO.getIsActive());
    }



}
