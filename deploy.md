# 🚀 Deployment Guide - Lawyer Booking System

## 📋 Prerequisites
- GitHub repository with your code
- MongoDB Atlas account
- Email service (Gmail recommended)
- Payment gateway (Razorpay recommended)

## 🎯 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

#### Frontend Deployment (Vercel)
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Set build settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variables:
     ```
     VITE_API_URL=https://your-backend-domain.railway.app/api
     ```
   - Deploy!

#### Backend Deployment (Railway)
1. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Set environment variables (see below)
   - Deploy!

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend Deployment (Netlify)
1. **Build locally**
   ```bash
   npm run build
   ```
2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `dist` folder
   - Or connect GitHub repository

#### Backend Deployment (Render)
1. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Create "Web Service"
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables

## 🔧 Environment Variables

### Backend Environment Variables
Set these in your hosting platform:

```env
# Server
PORT=4000
NODE_ENV=production

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lawyer-booking

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables
Set these in Vercel/Netlify:

```env
VITE_API_URL=https://your-backend-domain.railway.app/api
```

## 🔄 Post-Deployment Steps

1. **Update Frontend API URL**
   - Replace `your-backend-domain` with actual backend URL
   - Update CORS settings in backend

2. **Test the Application**
   - Test registration/login
   - Test booking flow
   - Test admin dashboard

3. **Seed the Database**
   ```bash
   npm run seed
   ```

4. **Monitor Logs**
   - Check backend logs for errors
   - Monitor frontend performance

## 🚨 Common Issues & Solutions

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly in backend
- Check CORS middleware configuration

### Database Connection Issues
- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`

## 📞 Support
If you encounter issues:
1. Check hosting platform logs
2. Verify environment variables
3. Test locally first
4. Check browser console for frontend errors

## 🎉 Success!
Once deployed, your app will be available at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.railway.app` 