from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

exchange_rates = {
    "USD": {"EUR": 0.93, "GBP": 0.80, "JPY": 151.50, "AUD": 1.52, "CAD": 1.36, "INR": 83.12, "CHF": 0.91, "CNY": 7.24},
    "EUR": {"USD": 1.07, "GBP": 0.86, "JPY": 162.50, "AUD": 1.63, "CAD": 1.46, "INR": 89.23, "CHF": 0.98, "CNY": 7.76},
    "GBP": {"USD": 1.25, "EUR": 1.16, "JPY": 189.50, "AUD": 1.90, "CAD": 1.70, "INR": 103.45, "CHF": 1.14, "CNY": 9.02},
    "JPY": {"USD": 0.0066, "EUR": 0.0061, "GBP": 0.0053, "AUD": 0.010, "CAD": 0.009, "INR": 0.55, "CHF": 0.006, "CNY": 0.048},
    "AUD": {"USD": 0.66, "EUR": 0.61, "GBP": 0.53, "JPY": 100.0, "CAD": 0.89, "INR": 54.67, "CHF": 0.60, "CNY": 4.76},
    "CAD": {"USD": 0.74, "EUR": 0.68, "GBP": 0.59, "JPY": 111.11, "AUD": 1.12, "INR": 61.23, "CHF": 0.67, "CNY": 5.32},
    "INR": {"USD": 0.012, "EUR": 0.011, "GBP": 0.0097, "JPY": 1.82, "AUD": 0.018, "CAD": 0.016, "CHF": 0.011, "CNY": 0.087},
    "CHF": {"USD": 1.10, "EUR": 1.02, "GBP": 0.88, "JPY": 166.67, "AUD": 1.67, "CAD": 1.49, "INR": 90.91, "CNY": 7.94},
    "CNY": {"USD": 0.14, "EUR": 0.13, "GBP": 0.11, "JPY": 20.83, "AUD": 0.21, "CAD": 0.19, "INR": 11.49, "CHF": 0.13}
}

@app.route('/api/currencies', methods=['GET'])
def get_currencies():
    """Return list of all available currencies with full details"""
    currencies = [
        {"code": "USD", "name": "US Dollar", "symbol": "$", "flag": "🇺🇸"},
        {"code": "EUR", "name": "Euro", "symbol": "€", "flag": "🇪🇺"},
        {"code": "GBP", "name": "British Pound", "symbol": "£", "flag": "🇬🇧"},
        {"code": "JPY", "name": "Japanese Yen", "symbol": "¥", "flag": "🇯🇵"},
        {"code": "AUD", "name": "Australian Dollar", "symbol": "A$", "flag": "🇦🇺"},
        {"code": "CAD", "name": "Canadian Dollar", "symbol": "C$", "flag": "🇨🇦"},
        {"code": "INR", "name": "Indian Rupee", "symbol": "₹", "flag": "🇮🇳"},
        {"code": "CHF", "name": "Swiss Franc", "symbol": "CHF", "flag": "🇨🇭"},
        {"code": "CNY", "name": "Chinese Yuan", "symbol": "¥", "flag": "🇨🇳"}
    ]
    return jsonify(currencies)

@app.route('/api/convert', methods=['POST'])
def convert_currency():
    """Handle any currency pair conversion with complete coverage"""
    try:
        data = request.get_json()
        
        
        required_fields = ['from_currency', 'to_currency', 'amount']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields", "required": required_fields}), 400
            
        from_curr = data['from_currency'].upper()
        to_curr = data['to_currency'].upper()
        
        
        try:
            amount = float(data['amount'])
            if amount <= 0:
                return jsonify({"error": "Amount must be positive"}), 400
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid amount format"}), 400
            
   
        if from_curr not in exchange_rates or to_curr not in exchange_rates:
            supported = list(exchange_rates.keys())
            return jsonify({
                "error": "Unsupported currency",
                "supported_currencies": supported
            }), 400
            
        
        if from_curr == to_curr:
            return jsonify({
                "converted_amount": round(amount, 2),
                "rate": 1.0,
                "from_currency": from_curr,
                "to_currency": to_curr,
                "original_amount": round(amount, 2),
                "message": "No conversion needed (same currency)"
            })
        
        
        try:
            rate = exchange_rates[from_curr][to_curr]
            converted = amount * rate
            return jsonify({
                "converted_amount": round(converted, 2),
                "rate": round(rate, 6),
                "from_currency": from_curr,
                "to_currency": to_curr,
                "original_amount": round(amount, 2),
                "from_symbol": next(c['symbol'] for c in get_currencies().json if c['code'] == from_curr),
                "to_symbol": next(c['symbol'] for c in get_currencies().json if c['code'] == to_curr)
            })
        except KeyError:
            return jsonify({"error": "Conversion rate not available"}), 400
            
    except Exception as e:
        app.logger.error(f"Server error during conversion: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')