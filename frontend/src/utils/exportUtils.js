/**
 * Utility to download leads data as a CSV file
 */
export const downloadLeadsAsCSV = (leads) => {
  if (!leads || leads.length === 0) {
    alert('No data available to export');
    return;
  }

  // Define headers
  const headers = [
    'Date',
    'Full Name',
    'Mobile',
    'Email',
    'Loan Type',
    'Amount',
    'City',
    'Status',
    'Agent'
  ];

  // Map data to rows
  const rows = leads.map(lead => [
    new Date(lead.createdAt).toLocaleDateString(),
    lead.fullName,
    lead.mobile,
    lead.email || 'N/A',
    lead.loanType,
    lead.amount,
    lead.city,
    lead.status,
    lead.assignedAgent?.name || 'Unassigned'
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `swayamfin_leads_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
