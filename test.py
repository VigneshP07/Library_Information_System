import pandas as pd
import json

# Custom JSON encoder to prevent escaping slashes
class NoEscapeJSONEncoder(json.JSONEncoder):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def default(self, obj):
        if isinstance(obj, str):
            return obj.replace('\\', '')
        return super().default(obj)

# Read the CSV file into a Pandas DataFrame
df = pd.read_csv('GoodReads_100k_books.csv')

# Select only the required columns
selected_columns = ['author', 'desc', 'genre', 'img', 'isbn', 'link', 'pages', 'title']
df_selected = df[selected_columns]

# Remove rows with non-ASCII characters
df_selected = df_selected[df_selected.apply(lambda x: x.astype(str).map(str.isascii).all(), axis=1)]

# Remove rows with any null or empty fields
df_selected = df_selected.dropna()

# Add a new column 'shelf' with incremental numbers
df_selected['shelf'] = df_selected.index // 20 + 1

# Output JSON file paths
jsonFilePath_10k = 'books_10k.json'

# Convert first 10k data
with open(jsonFilePath_10k, 'w', encoding='utf-8') as file:
    json.dump(json.loads(df_selected.head(10000).to_json(orient='records')), file, cls=NoEscapeJSONEncoder, ensure_ascii=False, indent=4)

print("Conversion completed!")
