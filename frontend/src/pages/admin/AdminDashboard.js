// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import axios from 'axios';
// import { 
//   Box, Typography, Grid, Paper, CircularProgress, Alert,
//   Card, CardContent, CardHeader, Divider
// } from '@mui/material';
// import { Dashboard as DashboardIcon } from '@mui/icons-material';

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalSlots: 0,
//     totalBookings: 0,
//     activeBookings: 0,
//     completedBookings: 0,
//     cancelledBookings: 0,
//     bookingsWithPenalty: 0
//   });

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       // Fetch all dashboard stats in a single API call
//       const response = await axios.get('/api/admin/dashboard');
//       const dashboardStats = response.data;
      
//       setStats({
//         totalUsers: dashboardStats.totalUsers,
//         totalSlots: dashboardStats.totalSlots,
//         totalBookings: dashboardStats.totalBookings,
//         activeBookings: dashboardStats.activeBookings,
//         completedBookings: dashboardStats.completedBookings,
//         cancelledBookings: dashboardStats.cancelledBookings,
//         bookingsWithPenalty: dashboardStats.bookingsWithPenalty
//       });
//     } catch (err) {
//       setError('Failed to load dashboard data. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>
      
//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardHeader title="System Overview" />
//               <Divider />
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Total Users:</strong> {stats.totalUsers}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Total Parking Slots:</strong> {stats.totalSlots}</Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardHeader title="Booking Statistics" />
//               <Divider />
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Total Bookings:</strong> {stats.totalBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Active Bookings:</strong> {stats.activeBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Completed:</strong> {stats.completedBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Cancelled:</strong> {stats.cancelledBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="body1" color="error">
//                       <strong>Bookings with Penalty:</strong> {stats.bookingsWithPenalty}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import axios from 'axios';
// import {
//   Box, Typography, Grid, Paper, CircularProgress, Alert,
//   Card, CardContent, CardHeader, Divider, TextField, Menu, MenuItem
// } from '@mui/material';

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalSlots: 0,
//     totalBookings: 0,
//     activeBookings: 0,
//     completedBookings: 0,
//     cancelledBookings: 0,
//     bookingsWithPenalty: 0
//   });

//   // Global search
//   const [searchTerm, setSearchTerm] = useState('');
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [slots, setSlots] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//     fetchGlobalData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const response = await axios.get('/api/admin/dashboard');
//       const dashboardStats = response.data;

//       setStats({
//         totalUsers: dashboardStats.totalUsers,
//         totalSlots: dashboardStats.totalSlots,
//         totalBookings: dashboardStats.totalBookings,
//         activeBookings: dashboardStats.activeBookings,
//         completedBookings: dashboardStats.completedBookings,
//         cancelledBookings: dashboardStats.cancelledBookings,
//         bookingsWithPenalty: dashboardStats.bookingsWithPenalty
//       });
//     } catch (err) {
//       setError('Failed to load dashboard data. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchGlobalData = async () => {
//     try {
//       const [usersRes, bookingsRes, slotsRes] = await Promise.all([
//         axios.get('/api/users'),
//         axios.get('/api/bookings'),
//         axios.get('/api/slots'),
//       ]);
//       setUsers(usersRes.data);
//       setBookings(bookingsRes.data);
//       setSlots(slotsRes.data);
//     } catch (err) {
//       console.error('Global data fetch failed:', err);
//     }
//   };

//   const filterData = (items) =>
//     items.filter(item =>
//       Object.values(item).some(val =>
//         val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );

//   const filteredUsers = filterData(users);
//   const filteredBookings = filterData(bookings);
//   const filteredSlots = filterData(slots);

//   return (
//     <Box>
//       {/* Top Header with Search */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4">Admin Dashboard</Typography>
//         <TextField
//           size="small"
//           variant="outlined"
//           placeholder="Global Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 300 }}
//         />
//       </Box>

//       {/* Search Results Dropdown */}
//       {searchTerm && (
//         <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//           <Typography variant="h6">Search Results for: "{searchTerm}"</Typography>
//           <Divider sx={{ my: 1 }} />
          
//           <Typography variant="subtitle1">Users:</Typography>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map(u => (
//               <Typography key={u.id} variant="body2">👤 {u.username} ({u.email})</Typography>
//             ))
//           ) : (
//             <Typography variant="body2" color="text.secondary">No matching users.</Typography>
//           )}

//           <Divider sx={{ my: 1 }} />
//           <Typography variant="subtitle1">Bookings:</Typography>
//           {filteredBookings.length > 0 ? (
//             filteredBookings.map(b => (
//               <Typography key={b.id} variant="body2">📅 Booking #{b.id} - {b.status}</Typography>
//             ))
//           ) : (
//             <Typography variant="body2" color="text.secondary">No matching bookings.</Typography>
//           )}

//           <Divider sx={{ my: 1 }} />
//           <Typography variant="subtitle1">Slots:</Typography>
//           {filteredSlots.length > 0 ? (
//             filteredSlots.map(s => (
//               <Typography key={s.id} variant="body2">🅿️ Slot #{s.slotNumber}</Typography>
//             ))
//           ) : (
//             <Typography variant="body2" color="text.secondary">No matching slots.</Typography>
//           )}
//         </Paper>
//       )}

//       {/* Main Dashboard Cards */}
//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardHeader title="System Overview" />
//               <Divider />
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Total Users:</strong> {stats.totalUsers}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Total Parking Slots:</strong> {stats.totalSlots}</Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardHeader title="Booking Statistics" />
//               <Divider />
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Total Bookings:</strong> {stats.totalBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Active Bookings:</strong> {stats.activeBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Completed:</strong> {stats.completedBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Cancelled:</strong> {stats.cancelledBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="body1" color="error">
//                       <strong>Bookings with Penalty:</strong> {stats.bookingsWithPenalty}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default AdminDashboard;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import axios from 'axios';
// import {
//   Box, Typography, Grid, Paper, CircularProgress, Alert, TextField,
//   Card, CardContent, CardHeader, Divider
// } from '@mui/material';

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalSlots: 0,
//     totalBookings: 0,
//     activeBookings: 0,
//     completedBookings: 0,
//     cancelledBookings: 0,
//     bookingsWithPenalty: 0
//   });

//   const [searchTerm, setSearchTerm] = useState('');
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [slots, setSlots] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//     fetchGlobalData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       const response = await axios.get('/api/admin/dashboard');
//       const dashboardStats = response.data;

//       setStats({
//         totalUsers: dashboardStats.totalUsers,
//         totalSlots: dashboardStats.totalSlots,
//         totalBookings: dashboardStats.totalBookings,
//         activeBookings: dashboardStats.activeBookings,
//         completedBookings: dashboardStats.completedBookings,
//         cancelledBookings: dashboardStats.cancelledBookings,
//         bookingsWithPenalty: dashboardStats.bookingsWithPenalty
//       });
//     } catch (err) {
//       setError('Failed to load dashboard data. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchGlobalData = async () => {
//     try {
//       const [usersRes, bookingsRes, slotsRes] = await Promise.all([
//         axios.get('/api/users'),
//         axios.get('/api/bookings'),
//         axios.get('/api/slots'),
//       ]);
//       setUsers(usersRes.data);
//       setBookings(bookingsRes.data);
//       setSlots(slotsRes.data);
//     } catch (err) {
//       console.error('Failed to fetch global data:', err);
//     }
//   };

//   const filterData = (items, fields) => {
//     return items.filter(item =>
//       fields.some(field =>
//         item[field]?.toString().toLowerCase().includes(searchTerm.trim().toLowerCase())
//       )
//     );
//   };

//   const filteredUsers = filterData(users, ['username', 'email']);
//   const filteredBookings = filterData(bookings, ['status', 'id']);
//   const filteredSlots = filterData(slots, ['slotNumber', 'status']);

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//       {/* Global Search */}
//       <Box sx={{ mt: 2, mb: 3 }}>
//         <TextField
//           label="Search globally"
//           variant="outlined"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         {searchTerm && (
//           <Paper sx={{ p: 2, mt: 2 }}>
//             <Typography variant="h6">Search Results for: "{searchTerm}"</Typography>
//             <Divider sx={{ my: 1 }} />
//             <Typography variant="subtitle1">Users:</Typography>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map(user => (
//                 <Typography key={user.id} variant="body2">
//                   {user.username} - {user.email}
//                 </Typography>
//               ))
//             ) : (
//               <Typography variant="body2">No matching users.</Typography>
//             )}
//             <Divider sx={{ my: 1 }} />
//             <Typography variant="subtitle1">Bookings:</Typography>
//             {filteredBookings.length > 0 ? (
//               filteredBookings.map(booking => (
//                 <Typography key={booking.id} variant="body2">
//                   Booking ID: {booking.id}, Status: {booking.status}
//                 </Typography>
//               ))
//             ) : (
//               <Typography variant="body2">No matching bookings.</Typography>
//             )}
//             <Divider sx={{ my: 1 }} />
//             <Typography variant="subtitle1">Slots:</Typography>
//             {filteredSlots.length > 0 ? (
//               filteredSlots.map(slot => (
//                 <Typography key={slot.id} variant="body2">
//                   Slot #{slot.slotNumber} - {slot.status}
//                 </Typography>
//               ))
//             ) : (
//               <Typography variant="body2">No matching slots.</Typography>
//             )}
//           </Paper>
//         )}
//       </Box>

//       {/* Dashboard Stats */}
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardHeader title="System Overview" />
//               <Divider />
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Total Users:</strong> {stats.totalUsers}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Total Parking Slots:</strong> {stats.totalSlots}</Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardHeader title="Booking Statistics" />
//               <Divider />
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Total Bookings:</strong> {stats.totalBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Active Bookings:</strong> {stats.activeBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Completed:</strong> {stats.completedBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1"><strong>Cancelled:</strong> {stats.cancelledBookings}</Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="body1" color="error">
//                       <strong>Bookings with Penalty:</strong> {stats.bookingsWithPenalty}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import {
  Box, Typography, Grid, Paper, CircularProgress, Alert,
  Card, CardContent, CardHeader, Divider, TextField
} from '@mui/material';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSlots: 0,
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    bookingsWithPenalty: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/admin/dashboard');
      const dashboardStats = response.data;
      setStats(dashboardStats);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const [usersRes, bookingsRes, slotsRes] = await Promise.all([
        axios.get('/api/admin/users'),
        axios.get('/api/bookings'),
        axios.get('/api/parking-slots')
      ]);

      const lowerTerm = term.toLowerCase();

      const matchedUsers = usersRes.data.filter(user =>
        Object.values(user).some(val =>
          String(val).toLowerCase().includes(lowerTerm)
        )
      );

      const matchedBookings = bookingsRes.data.filter(booking =>
        Object.values(booking).some(val =>
          String(val).toLowerCase().includes(lowerTerm)
        )
      );

      const matchedSlots = slotsRes.data.filter(slot =>
        Object.values(slot).some(val =>
          String(val).toLowerCase().includes(lowerTerm)
        )
      );

      setSearchResults({
        users: matchedUsers,
        bookings: matchedBookings,
        slots: matchedSlots
      });

    } catch (err) {
      console.error("Search failed", err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Search globally"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      {searchTerm && searchResults && (
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6">
            Search Results for: "{searchTerm}"
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1"><strong>Users:</strong></Typography>
          {searchResults.users.length > 0 ? (
            searchResults.users.map((user, i) => (
              <Typography key={i}>{user.email || JSON.stringify(user)}</Typography>
            ))
          ) : (
            <Typography>No matching users.</Typography>
          )}
          <Typography variant="subtitle1" sx={{ mt: 2 }}><strong>Bookings:</strong></Typography>
          {searchResults.bookings.length > 0 ? (
            searchResults.bookings.map((booking, i) => (
              <Typography key={i}>{JSON.stringify(booking)}</Typography>
            ))
          ) : (
            <Typography>No matching bookings.</Typography>
          )}
          <Typography variant="subtitle1" sx={{ mt: 2 }}><strong>Slots:</strong></Typography>
          {searchResults.slots.length > 0 ? (
            searchResults.slots.map((slot, i) => (
              <Typography key={i}>{JSON.stringify(slot)}</Typography>
            ))
          ) : (
            <Typography>No matching slots.</Typography>
          )}
        </Paper>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="System Overview" />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography><strong>Total Users:</strong> {stats.totalUsers}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Total Parking Slots:</strong> {stats.totalSlots}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Booking Statistics" />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography><strong>Total Bookings:</strong> {stats.totalBookings}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Active Bookings:</strong> {stats.activeBookings}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Completed:</strong> {stats.completedBookings}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Cancelled:</strong> {stats.cancelledBookings}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="error">
                      <strong>Bookings with Penalty:</strong> {stats.bookingsWithPenalty}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AdminDashboard;


