from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Image, PageBreak
import matplotlib.pyplot as plt
import io
from reportlab.platypus import Spacer

# Define the styles
styles = getSampleStyleSheet()

# Dummy Data Functions
def get_dummy_income_data():
    return [
        ["Salary", 50000, 50],
        ["Freelance", 30000, 30],
        ["Investments", 20000, 20],
        ["Side Business", 15000, 15],
        ["Stock Dividends", 10000, 10],
        ["Rental Income", 12000, 12],
    ]

def get_dummy_expense_data():
    return [
        ["Rent", 15000, 30],
        ["Food", 10000, 20],
        ["Transport", 5000, 10],
        ["Entertainment", 4000, 8],
        ["Healthcare", 7000, 14],
        ["Utilities", 6000, 12],
        ["Education", 8000, 16],
    ]

def get_dummy_savings_data():
    return [
        ["2025", 10000, 10],
        ["2026", 15000, 15],
        ["2027", 20000, 20],
        ["2028", 25000, 25],
        ["2029", 30000, 30],
    ]

def get_dummy_debt_data():
    return [
        ["2025", 5000, 5],
        ["2026", 10000, 10],
        ["2027", 15000, 15],
        ["2028", 20000, 20],
        ["2029", 25000, 25],
    ]

def get_dummy_summary():
    return "This is a summary of the financial report. It provides an overview of income, expenses, savings, and debt for the evaluation period."

def get_dummy_recommendations():
    return "Consider increasing your savings and reducing unnecessary expenses. Review your investment portfolio for better returns."

# Generate Pie Chart with Pastel Colors
def generate_pie_chart(data, labels, title):
    plt.figure(figsize=(6, 6))
    
    # Define a pastel color palette
    pastel_colors = [
        '#FFB6C1',  # Light Pink
        '#87CEEB',  # Sky Blue
        '#98FB98',  # Pale Green
        '#FFD700',  # Gold
        '#FFA07A',  # Light Salmon
        '#DDA0DD',  # Plum
        '#B0E0E6',  # Powder Blue
        '#FFE4B5',  # Moccasin
        '#AFEEEE',  # Pale Turquoise
        '#F0E68C',  # Khaki
    ]
    
    # Create the pie chart with pastel colors
    plt.pie(data, labels=labels, autopct='%1.1f%%', startangle=140, colors=pastel_colors)
    plt.title(title)
    
    # Save the chart to a buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    return buf

# Generate Bar Chart
def generate_bar_chart(data, labels, title):
    plt.figure(figsize=(10, 6))
    plt.bar(labels, data, color='skyblue')
    plt.title(title)
    plt.xlabel('Categories')
    plt.ylabel('Amount (¥)')
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    return buf

# Create PDF Report
def create_pdf(data):
    pdf = SimpleDocTemplate("financial_report.pdf", pagesize=letter)
    elements = []

    # Define a custom style for bold and left-aligned text
    bold_left_style = ParagraphStyle(
        name='BoldLeft',
        parent=styles['Title'],  # Inherit from the 'Title' style
        fontName='Helvetica-Bold',  # Set font to bold
        alignment=0  # 0 = left align, 1 = center, 2 = right align
    )

    # Define pastel colors for tables
    pastel_header_color = '#FFC034'  # Sky Blue for headers
    pastel_row_color = '#FEF2CC'    # Light Cyan for rows

    # Page 1: Income & Earnings
    elements.append(Paragraph("FINANCIAL REPORT", bold_left_style))  # Left-aligned and bold
    elements.append(Spacer(0, 20))
    elements.append(Paragraph(f"This financial report evaluates income sources from {data['time_period']}. It provides a detailed breakdown of earnings and their contribution to overall financial stability. The following insights help in understanding income diversification and potential areas for growth."))
    elements.append(Spacer(0, 30))
    income_data = [["Source", "Income", "% Total percentage"]] + data['income']
    income_table = Table(income_data, colWidths=[pdf.width / 3] * 3)
    income_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), pastel_header_color),  # Pastel header color
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),  # Black text for headers
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), pastel_row_color),  # Pastel row color
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(income_table)
    
    pie_chart = generate_pie_chart([x[1] for x in data['income']], [x[0] for x in data['income']], "Income Distribution")
    elements.append(Image(pie_chart, width=350, height=350))

    # Page Break for Expense Analysis
    elements.append(PageBreak())

    # Page 2: Expense Analysis
    elements.append(Paragraph("Expense Analysis", styles['Heading2']))
    elements.append(Spacer(0, 20))
    elements.append(Paragraph("Understanding expenses is key to maintaining financial stability. This section breaks down spending into essential and discretionary categories, helping identify areas for better budget management. By tracking and analyzing expenses, individuals can make informed decisions to optimize savings and reduce unnecessary costs."))
    elements.append(Spacer(0, 30))
    expense_data = [["Category", "Amount (¥)", "% of Total Expenses"]] + data['expenses']
    expense_table = Table(expense_data, colWidths=[pdf.width / 3] * 3)
    expense_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), pastel_header_color),  # Pastel header color
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),  # Black text for headers
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), pastel_row_color),  # Pastel row color
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(expense_table)
    
    bar_chart = generate_bar_chart([x[1] for x in data['expenses']], [x[0] for x in data['expenses']], "Expense Distribution")
    elements.append(Image(bar_chart, width=500, height=300))

    # Page Break for Savings & Investments and Debt & Liabilities
    elements.append(PageBreak())

    # Page 3: Savings & Investments
    elements.append(Paragraph("Savings & Investments", styles['Heading2']))
    elements.append(Spacer(0, 20))
    elements.append(Paragraph("This section represents the growth of savings and investments over time. A steady increase in annual contributions indicates a commitment to financial security and long-term wealth accumulation. Diversified investments help maximize returns while ensuring stability for future financial goals."))
    elements.append(Spacer(0, 30))
    savings_data = [["Year", "Annual (1)", "Results %"]] + data['savings']
    savings_table = Table(savings_data, colWidths=[pdf.width / 3] * 3)
    savings_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), pastel_header_color),  # Pastel header color
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),  # Black text for headers
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), pastel_row_color),  # Pastel row color
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(savings_table)
    
    savings_pie_chart = generate_pie_chart([x[1] for x in data['savings']], [x[0] for x in data['savings']], "Savings Distribution")
    elements.append(Image(savings_pie_chart, width=400, height=400))
    elements.append(PageBreak())

    elements.append(Paragraph("Debt & Liabilities", styles['Heading2']))
    elements.append(Spacer(0, 20))
    elements.append(Paragraph("This section highlights the progression of debt over time. An increasing trend in liabilities emphasizes the importance of strategic debt management. Effective planning and timely repayments can help maintain financial stability and prevent long-term financial strain."))
    elements.append(Spacer(0, 30))
    debt_data = [["Year", "Annual (1)", "Results %"]] + data['debt']
    debt_table = Table(debt_data, colWidths=[pdf.width / 3] * 3)
    debt_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), pastel_header_color),  # Pastel header color
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),  # Black text for headers
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), pastel_row_color),  # Pastel row color
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(debt_table)
    
    debt_bar_chart = generate_bar_chart([x[1] for x in data['debt']], [x[0] for x in data['debt']], "Debt Distribution")
    elements.append(Image(debt_bar_chart, width=500, height=300))

    # Page Break for Summary & Recommendations
    elements.append(PageBreak())

    # Page 4: AI Summarizer and Recommendations
    elements.append(Paragraph("AI Summarizer", styles['Heading2']))
    elements.append(Paragraph(data['summary'], styles['Normal']))
    elements.append(Paragraph("Recommendations", styles['Heading2']))
    elements.append(Paragraph(data['recommendations'], styles['Normal']))

    pdf.build(elements)

# Dummy Data for Testing
def get_dummy_data():
    return {
        "time_period": "2025-01-01 to 2025-03-31",
        "income": get_dummy_income_data(),
        "expenses": get_dummy_expense_data(),
        "savings": get_dummy_savings_data(),
        "debt": get_dummy_debt_data(),
        "summary": get_dummy_summary(),
        "recommendations": get_dummy_recommendations()
    }

# Generate the PDF
data = get_dummy_data()
create_pdf(data)
print("PDF report generated successfully!")