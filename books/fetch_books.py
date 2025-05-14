import asyncio
from playwright.async_api import async_playwright
from playwright_stealth import stealth_async
import os
from dotenv import load_dotenv
import json
import time
import random

# Load environment variables
load_dotenv()

class GreatestBooksClient:
    def __init__(self):
        self.base_url = "https://thegreatestbooks.org"
        self.browser = None
        self.context = None
        self.page = None

    async def init_browser(self, playwright):
        """Initialize the browser with proper settings"""
        self.browser = await playwright.chromium.launch(
            headless=True,  # Set to False for debugging
            args=['--disable-blink-features=AutomationControlled']
        )
        
        # Create a new context with proper viewport and user agent
        self.context = await self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        )
        
        # Create a new page
        self.page = await self.context.new_page()
        
        # Add event listeners for debugging
        self.page.on('console', lambda msg: print(f'Browser Console: {msg.text}'))
        self.page.on('pageerror', lambda err: print(f'Browser Error: {err}'))

        await stealth_async(self.page)

    async def close(self):
        """Close browser and cleanup"""
        if self.browser:
            await self.browser.close()

    async def test_connection(self):
        """Test connection to different URLs"""
        test_urls = [
            self.base_url,
            f"{self.base_url}/users/email_sign_in_form",
            f"{self.base_url}/index.csv"
        ]

        for url in test_urls:
            print(f"\nTesting URL: {url}")
            try:
                # Navigate to the URL
                response = await self.page.goto(url, wait_until='networkidle')
                
                # Print response details
                await self._print_response_details(response)
                
                # Take a screenshot for debugging
                await self.page.screenshot(path=f"debug_{url.split('/')[-1]}.png")
                
                # Wait between requests
                await asyncio.sleep(2)
                
            except Exception as e:
                print(f"Error: {str(e)}")

    async def _print_response_details(self, response):
        print(f"\nResponse Details:")
        print(f"Status Code: {response.status}")
        print(f"URL: {response.url}")
        
        # Get and print headers
        print("\nHeaders:")
        for key, value in response.headers.items():
            print(f"{key}: {value}")
        
        # Get and print cookies
        print("\nCookies:")
        for cookie in await response.request.client.get_cookies():
            print(f"{cookie['name']}: {cookie['value']}")
        
        # Get page content
        content = await response.text()
        print("\nFirst 500 chars of content:")
        print(content[:500])

async def main():
    async with async_playwright() as p:
        client = GreatestBooksClient()
        try:
            await client.init_browser(p)
            await client.test_connection()
        finally:
            await client.close()

if __name__ == "__main__":
    asyncio.run(main()) 