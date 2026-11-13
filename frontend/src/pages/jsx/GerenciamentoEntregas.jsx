import { useRef, useState } from "react";
import axios from "axios";
import {
    Alert, Box, Button, Checkbox, Chip, CircularProgress, Dialog, DialogActions,
    DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Radio,
    RadioGroup, Snackbar, Stack, TextField, Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../components/jsx/Header";
import Footer from "../../components/jsx/Footer";

const API = "http://localhost:3000";

