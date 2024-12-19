import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [deliveryData, setDeliveryData] = useState([]); // State for multiple delivery guys

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.120:5000/api/delivery-location'); // Correct API endpoint
        const data = await response.json();
        setDeliveryData(Array.isArray(data) ? data : [data]); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      }
    };

    const interval = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>Admin Dashboard</div>
        <ul style={styles.navList}>
          <li style={styles.navItem}>Dashboard</li>
          <li style={styles.navItem}>Reports</li>
          <li style={styles.navItem}>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={{ margin: 0 }}>Real-Time Delivery Tracking</h1>
        </div>

        {/* Table Section */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Delivery Guy ID</th>
                <th style={styles.th}>Latitude</th>
                <th style={styles.th}>Longitude</th>
                <th style={styles.th}>Destination Address</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveryData.length > 0 ? (
                deliveryData.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.deliveryGuyId || 'N/A'}</td>
                    <td style={styles.td}>{item.latitude || 'N/A'}</td>
                    <td style={styles.td}>{item.longitude || 'N/A'}</td>
                    <td style={styles.td}>{item.destinationAddress || 'Not Provided'}</td>
                    <td style={styles.td}>{item.status || 'Unknown'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '12px' }}>
                    Waiting for location updates...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    marginBottom: '15px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
  },
  header: {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '15px 20px',
    textAlign: 'center',
  },
  tableContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  th: {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px',
    color: '#333',
    textAlign: 'center',
  },
};

export default AdminDashboard;
