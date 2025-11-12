git reset HEAD~1
rm ./backport.sh
git cherry-pick 2b76c38e1f0a84d9f1b287124485568886ca9bc9
echo 'Resolve conflicts and force push this branch.\n\nTo backport translations run: bin/i18n/merge-translations <release-branch>'
