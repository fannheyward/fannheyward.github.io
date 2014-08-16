task :default => :build

desc 'Make a new post'
task :post do
    print 'Enter post title: '
    title = STDIN.gets.chomp
    abort 'No title.' unless title.length > 0

    filename = "_posts/#{Time.new.strftime('%Y-%m-%d')}-#{title.downcase.gsub(' ', '-')}.markdown"
    abort "Error: #{filename} already exists." if File.exist?(filename)

    puts "Creating new post: #{filename}"
    open(filename, 'w') do |post|
        post.puts "---"
        post.puts "layout: post"
        post.puts "title: \"#{title}\""
        post.puts "date: #{Time.new.to_s}"
        post.puts "---"
        post.puts ""
    end
end

desc 'Build site with Jekyll'
task :build do
    sh 'jekyll build'
    sh 'open http://127.0.0.1:4003'
end

desc "list tasks"
task :list do
  puts "Tasks: #{(Rake::Task.tasks - [Rake::Task[:list]]).join(', ')}"
end

