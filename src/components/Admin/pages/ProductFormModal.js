import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button, 
  TextField,
  Switch,
  FormControlLabel,
  Box
} from '@mui/material';

const ProductFormModal = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    creationDate: new Date().toISOString().split('T')[0],
    inSold: false,
    startDate: '',
    lastDate: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        creationDate: product.creationDate,
        inSold: product.inSold,
        startDate: product.startDate || '',
        lastDate: product.lastDate || ''
      });
      
      if (product.image) {
        const binary = String.fromCharCode.apply(null, product.image);
        setPreviewUrl(`data:image/jpeg;base64,${window.btoa(binary)}`);
      }
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        setFormData(prev => ({ ...prev, image: uint8Array }));
        setPreviewUrl(URL.createObjectURL(file));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    //onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"}>
      <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'row',alignItems: 'center',justifyContent:'space-evenly', gap: 2, my: 2 ,minWidth: '800px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
            {previewUrl && (
              <img
                src={previewUrl} 
                alt="Preview" 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
              />
            )}
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2,minWidth: '400px',paddingTop: '20px'  }}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={formData.price}
            onChange={handleInputChange}
          />
          { formData.inSold && (<TextField
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.startDate}
            onChange={handleInputChange}
          />)}
          { formData.inSold && (<TextField
            name="lastDate"
            label="Last Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.lastDate}
            onChange={handleInputChange}
          />)}
          <FormControlLabel
            control={
              <Switch
                checked={formData.inSold}
                onChange={handleInputChange}
                name="inSold"
              />
            }
            label="In Promotion"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormModal;