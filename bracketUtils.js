function advanceWinnerToNextRound(event, match) {
    const nextRoundNumber = match.round + 1;
    const nextRoundMatches = event.matches.filter(m => m.round === nextRoundNumber);

    if (nextRoundMatches.length === 0) {
        console.log('No more rounds. Tournament complete!');
        return;
    }

    const nextMatchIndex = Math.floor((match.id - 1) / 2);
    const nextMatch = nextRoundMatches[nextMatchIndex];

    if (!nextMatch) {
        console.warn('Next match not found, skipping advancement.');
        return;
    }

    if (!nextMatch.player1) {
        nextMatch.player1 = match.winner;
    } else if (!nextMatch.player2) {
        nextMatch.player2 = match.winner;
    } else {
        console.warn('Next match already has both players.');
    }

    console.log(`Advanced winner ${match.winner} to match ${nextMatch.id}`);
}

module.exports = {
    advanceWinnerToNextRound,
};
