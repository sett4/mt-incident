import { IncidentArticle, MultipleArticleKey } from '../'
import { Np24ArticleScraper } from './np24';
import { YahooArticleScraper, YahooVideoArticleScraper } from './yahoo';
import { NhkLocalArticleScraper, NhkArticleScraper } from './nhk';

export interface ArticleScraper {
    canAccept(url: string): boolean;
    scrape(url: string): Promise<IncidentArticle[]>;
    readonly source: string;
    readonly sourceName: string;
}

export class ArticleScrapers {
    private scrapers: ArticleScraper[] = [new Np24ArticleScraper(), new YahooArticleScraper(), new YahooVideoArticleScraper(), new NhkLocalArticleScraper(), new NhkArticleScraper()];
    register(scraper: ArticleScraper): void {
        this.scrapers.push(scraper);
    }

    scrape(url: string): Promise<IncidentArticle[]> {
        let scraper = this.scrapers.find(s => s.canAccept(url))
        if (!scraper) {
            return new Promise<IncidentArticle[]>((resolve, reject) => { resolve([]); });
        }

        return scraper.scrape(url);
    }
}