import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ThreeCircles } from "react-loader-spinner";
import Swal from 'sweetalert2';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Sign = () => {

  function capitalizeFirstLetter(string) {
    if (!string || typeof string !== 'string') return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const [formData, setFormData] = useState({
    student_Name: '',
    course: '',
    father_Name: '',
    mother_Name: '',
    family_Income: '',
    need: '',
    amount: '',
    email: '',
    password: '',
    contact_No: '',

    Bank_Name: '',
    Bank_Acc_No: '',
    Ifsc_num: '',
    img1: null,
    img2: null,
    img3: null,
    houseNo: '',
    StreetNo: '',
    city: '',
    state: '',
    pincode: '',
    paragraph: '',
    StudentImgShow: 'Yes',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const formDataToSubmit = new FormData();

          const capitalizedData = { ...formData };

          // Capitalize necessary text fields
          const fieldsToCapitalize = [
            'student_Name', 'course', 'father_Name', 'mother_Name',
            'need', 'Bank_Name', 'city', 'state', 'paragraph',
            'houseNo', 'StreetNo'
          ];

          fieldsToCapitalize.forEach(field => {
            if (capitalizedData[field]) {
              capitalizedData[field] = capitalizeFirstLetter(capitalizedData[field]);
            }
          });

          // Append all fields
          Object.keys(capitalizedData).forEach(key => {
            if (key !== 'img1' && key !== 'img2' && key !== 'img3') {
              formDataToSubmit.append(key, capitalizedData[key]);
            }
          });

          // Append images
          formDataToSubmit.append('img1', formData.img1);
          formDataToSubmit.append('img2', formData.img2);
          formDataToSubmit.append('img3', formData.img3);

          const response = await axios.post('http://localhost:2001/n', formDataToSubmit, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });

          toast.success('Registration successful');

          // Reset form
          setFormData({
            student_Name: '', course: '', father_Name: '', mother_Name: '',
            family_Income: '', need: '', amount: '', email: '', password: '',
            contact_No: '', Bank_Name: '', Bank_Acc_No: '', Ifsc_num: '',
            img1: null, img2: null, img3: null, houseNo: '', StreetNo: '',
            city: '', state: '', pincode: '', paragraph: '', StudentImgShow: 'Yes'
          });

          setTimeout(() => {
            setLoading(false);
          }, 500);

          setTimeout(() => {
            navigate('/login');
          }, 3000);

        } catch (error) {
          setLoading(false);
          Swal.fire('Error!', error.response.data, 'error');
        }
      } else {
        setLoading(false);
      }
    });
  };


  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1">Apply for Scholarship</Typography>
      </Box>
      <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Student Name"
            fullWidth
            margin="normal"
            name="student_Name"
            value={formData.student_Name}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />

          <TextField
            label="Registration No."
            fullWidth
            margin="normal"
            name="Registration_no"
            value={formData.Registration_no}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />

          <TextField
            label="Course"
            fullWidth
            margin="normal"
            name="course"
            value={formData.course}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="Father Name"
            fullWidth
            margin="normal"
            name="father_Name"
            value={formData.father_Name}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="Mother Name"
            fullWidth
            margin="normal"
            name="mother_Name"
            value={formData.mother_Name}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="Family Income"
            fullWidth
            margin="normal"
            name="family_Income"
            value={formData.family_Income}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />

          {/* Requirement Select Box */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="requirement-label">Requirement</InputLabel>
            <Select
              labelId="requirement-label"
              id="requirement"
              name="need"
              value={formData.need}
              onChange={handleChange}
              label="Requirement"
              sx={{
                marginBottom: 2,
                border: '1px solid #ccc',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            >
              <MenuItem value=" Fee">Fees</MenuItem>
              <MenuItem value="laptop">Laptop</MenuItem>

              <MenuItem value="Books Fee">Books Fee</MenuItem>

              <MenuItem value="Tuition Fee">Tuition Fee</MenuItem>
              <MenuItem value="Statutory Material">Stationary Material</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>



          {/* Paragraph Textarea */}
          <TextField
            label="Paragraph"
            fullWidth
            margin="normal"
            name="paragraph"
            value={formData.paragraph}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />

          {/* Student Image Show Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="imgShow-label">Do you want to show your profile to the donor?</InputLabel>
            <Select
              labelId="imgShow-label"
              id="StudentImgShow"
              name="StudentImgShow"
              value={formData.StudentImgShow}
              onChange={handleChange}
              label="Show Student Image"
              sx={{
                marginBottom: 2,
                border: '1px solid #ccc',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>




          {/* Address Fields */}
          <TextField
            label="House No"
            fullWidth
            margin="normal"
            name="houseNo"
            value={formData.houseNo}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="Street No"
            fullWidth
            margin="normal"
            name="StreetNo"
            value={formData.StreetNo}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            name="city"
            value={formData.city}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="State"
            fullWidth
            margin="normal"
            name="state"
            value={formData.state}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="Pincode"
            fullWidth
            margin="normal"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />




          <TextField
            label="Amount Needed"
            fullWidth
            margin="normal"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="Email ID"
            fullWidth
            margin="normal"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <Box sx={{ marginBottom: 2 }}>
            <label>Contact No:</label>
            <PhoneInput
              country="us"
              value={formData.contact_No}
              onChange={(value) => setFormData({ ...formData, contact_No: value })}
              inputProps={{
                name: "contact_No",
                required: true,
              }}
            />
          </Box>

          <TextField
            label="Bank Name"
            fullWidth
            margin="normal"
            name="Bank_Name"
            value={formData.Bank_Name}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="Account No."
            fullWidth
            margin="normal"
            name="Bank_Acc_No"
            value={formData.Bank_Acc_No}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <TextField
            label="IFSC Code"
            fullWidth
            margin="normal"
            name="Ifsc_num"
            value={formData.Ifsc_num}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <Box sx={{
            marginBottom: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
            },
          }}>
            <label>Upload your Image:</label>
            <input type="file" name="img1" onChange={handleFileChange} />
          </Box>
          <Box sx={{
            marginBottom: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
            },
          }}>
            <label>Upload your Aadhar Card:</label>
            <input type="file" name="img2" onChange={handleFileChange} />
          </Box>
          <Box sx={{
            marginBottom: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
            },
          }}>
            <label>Upload your Income Certificate :</label>
            <input type="file" name="img3" onChange={handleFileChange} />
          </Box>
          {/* Conditionally render the button when not loading */}
          {!loading ? (
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          ) : (
            <Box sx={{ marginTop: 2 }}>
              <ThreeCircles
                visible={loading}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="three-circles-loading"
                wrapperStyle={{ marginTop: "20px" }}
                wrapperClass=""
              />
            </Box>
          )}


          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Link to="/login">Click Here For Login..</Link>
          </Box>
        </form>
      </Box >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box >
  );
};

export default Sign;
